package io.pivotal.game.of.life.server

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.pivotal.game.of.life.core.Coordinate.Companion.by
import io.pivotal.game.of.life.core.Plane
import io.pivotal.game.of.life.core.Plane.Companion.plane
import io.pivotal.game.of.life.core.next
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.http.MediaType
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.router
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping
import org.springframework.web.reactive.socket.WebSocketHandler
import org.springframework.web.reactive.socket.WebSocketSession
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.Duration


@SpringBootApplication
open class GameOfLifeServer {

    init {

        val a = ClassPathResource("/index.html")

        println()
    }

    @Bean
    open fun mapper() = jacksonObjectMapper()

    private val rPentomino = plane(
        -1 by 0,
        0 by -1,
        0 by 0,
        0 by 1,
        1 by 1
    )

    private val acorn = plane(
        -3 by -1,
        -2 by -1,
        -2 by 1,
        0 by 0,
        1 by -1,
        2 by -1,
        3 by -1
    )

    @Bean
    open fun startingBoard(): Plane {
        return acorn
    }

    @Bean
    open fun boardHolder(startingPlane: Plane): BoardHolder = object : BoardHolder {

        private var board = startingPlane

        override fun set(plane: Plane) {
            this.board = plane
        }

        override fun next(): Plane = board.also { set(board.next) }
    }

    @Bean
    open fun boardHandler(
        boardHolder: BoardHolder,
        mapper: ObjectMapper
    ) = BoardHandler(boardHolder = boardHolder, mapper = mapper)

    @Bean
    open fun handlerMapping(boardHandler: BoardHandler) =
        SimpleUrlHandlerMapping().apply {
            urlMap = mapOf(
                "/life" to boardHandler,
                "/slife" to ExampleHandler()
            )
            order = -1
        }

    @Bean
    open fun handlerAdapter() = WebSocketHandlerAdapter()

    @Bean
    open fun indexRouter(@Value("classpath:/static/index.html") indexHtml: Resource): RouterFunction<ServerResponse> {
        return router {
            GET("/") { ok().contentType(MediaType.TEXT_HTML).syncBody(indexHtml) }
        }
    }
}

interface BoardHolder {

    fun set(plane: Plane)

    fun next(): Plane
}

class BoardHandler(
    private val boardHolder: BoardHolder,
    private val mapper: ObjectMapper
) : WebSocketHandler {

    override fun handle(session: WebSocketSession): Mono<Void> {

        val flux = Flux
            .interval(Duration.ofMillis(250))
            .map { session.textMessage(nextBoard()) }

        return session.send(flux)
    }

    private fun nextBoard() = boardHolder.next().let { mapper.writeValueAsString(it) }
}

class ExampleHandler : WebSocketHandler {

    override fun handle(session: WebSocketSession): Mono<Void> {
        val flux = session
            .receive()
            .map { value -> value.payloadAsText }
            .doOnNext(::println)
            .map { session.textMessage("Echo '$it'") }

        return session.send(flux)
    }
}

fun main(args: Array<String>) {
    runApplication<GameOfLifeServer>(*args)
}
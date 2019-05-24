package io.pivotal.game.of.life.server

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.pivotal.game.of.life.core.Plane
import io.pivotal.game.of.life.core.Plane.Companion.plane
import io.pivotal.game.of.life.core.Coordinate.Companion.by
import io.pivotal.game.of.life.core.next
import org.assertj.core.api.Assertions.assertThat
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient
import org.springframework.web.reactive.socket.client.WebSocketClient
import reactor.core.publisher.Mono
import java.lang.Thread.sleep
import java.net.URI
import kotlin.test.Test
import kotlin.test.assertEquals

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GameOfLifeServerTest {

    @LocalServerPort
    lateinit var port: String

    private val mapper = jacksonObjectMapper()

    @Autowired
    lateinit var boardHolder: BoardHolder

    @Test
    fun `connects to a flux`() {

        val someString = "Hello"

        var response: String? = null

        val client: WebSocketClient = ReactorNettyWebSocketClient()

        val x = client.execute(
            URI("ws://localhost:$port/slife")
        ) { session ->
            session.send(session.textMessage(someString).asMono)
                .thenMany(session.receive().doOnNext { response = it.payloadAsText })
                .then()

        }.subscribe()

        sleep(2000)

        assertEquals("Echo '$someString'", response)
    }

    @Test
    fun `on connect, receive board`() {

        val startingBoard = plane(-1 by 0, 0 by 0, 1 by 0)

        boardHolder.set(startingBoard)

        val receivedBoards = mutableListOf<Plane>()

        val client: WebSocketClient = ReactorNettyWebSocketClient()

        client
            .execute(URI("ws://localhost:$port/life")) { session ->
                session
                    .receive()
                    .map { it.payloadAsText }
                    .map { mapper.readValue<Plane>(it) }
                    .doOnNext { receivedBoards.add(it) }
                    .then()
            }
            .subscribe()

        sleep(1200)

        assertThat(receivedBoards).containsExactlyInAnyOrder(startingBoard, startingBoard.next)
    }

    @Test
    fun `board holder holds board`() {
    }
}

val <a> a.asMono: Mono<a> get() = Mono.just(this)
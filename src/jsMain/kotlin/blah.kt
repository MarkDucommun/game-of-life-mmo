import io.pivotal.game.of.life.core.*
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.WebSocket
import kotlin.browser.document

fun main() {

    val dimension = 1000
    val viewport = 100.viewport

    val htmlCanvas = (document.createElement("canvas") as HTMLCanvasElement).apply {
        width = dimension
        height = dimension
    }

    val context = htmlCanvas.getContext("2d") as CanvasRenderingContext2D

    val socket = WebSocket("ws://localhost:8080/life")

    val canvas = Canvas(dimension, dimension)

    val paintSquare = { it: Square ->
        context.fillStyle = it.color
        context.fillRect(
            it.upperLeft.x.toDouble(),
            it.upperLeft.y.toDouble(),
            it.dimension.toDouble(),
            it.dimension.toDouble()
        )
    }

    val paint =
        { it: String -> paintBoard(canvas = canvas, viewport = viewport, boardString = it, paint = paintSquare) }

    socket.onmessage = { message -> paint(message.data as String) }

    document.body?.appendChild(htmlCanvas)
}

fun paintBoard(canvas: Canvas, viewport: Viewport, boardString: String, paint: Paint) {

    JSON.parse<PlaneJSON>(boardString).asPlane.toView(viewport).paint(canvas, paint)
}

external interface PlaneJSON {
    val living: Array<CoordinateJSON>
}

val PlaneJSON.asPlane get() = Plane(living = living.map { it.asCoordinate })

external interface CoordinateJSON {
    val x: Int
    val y: Int
}

val CoordinateJSON.asCoordinate get() = Coordinate(x = x.toLong(), y = y.toLong())
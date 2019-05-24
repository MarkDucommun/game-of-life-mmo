package io.pivotal.game.of.life.core

fun View.paint(canvas: Canvas, paint: Paint) {

    val dimension = canvas.width / width

    val paints = { upperLeft: Coordinate, color: String -> paint(Square(Coordinate(x = upperLeft.x * dimension, y = upperLeft.y * dimension), dimension, color)) }
    val alive = { upperLeft: Coordinate -> paints(upperLeft, "#FFFFE1") }
    val dead = { upperLeft: Coordinate ->paints(upperLeft, "#222228") }

    (0L until width)
        .flatMap { x -> (0L until height).map { y -> Coordinate(x = x, y = y) } }
        .filterNot { living.contains(it) }
        .forEach { dead(it) }

    living.forEach { alive(it) }
}

typealias Paint = (Square) -> Unit

data class Square(
    val upperLeft: Coordinate,
    val dimension: Int,
    val color: String
)

data class Canvas(
    val width: Int,
    val height: Int
)
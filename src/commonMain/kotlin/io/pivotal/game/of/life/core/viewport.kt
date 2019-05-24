package io.pivotal.game.of.life.core

import io.pivotal.game.of.life.core.Coordinate.Companion.by

data class Viewport(
    val origin: Coordinate,
    val width: Int,
    val height: Int
)

data class View(
    val living: List<Coordinate>,
    val width: Int,
    val height: Int
) {
    companion object {
        fun view(width: Int, height: Int, vararg living: Coordinate): View =
            View(width = width, height = height, living = living.toList())
    }
}

val Int.viewport get() = Viewport(origin = -(this / 2) by this / 2, width = this + 1, height = this + 1)

fun Plane.toView(viewport: Viewport): View {

    val farCorner: Coordinate = viewport.origin + (viewport.width by -viewport.height)

    fun between(coordinate: Coordinate) = coordinate.between(viewport.origin, farCorner)

    fun translateToView(coordinate: Coordinate) = coordinate.translateToView(viewport.origin)

    val coordinates = living
        .asSequence()
        .filter(::between)
        .map(::translateToView)
        .toList()

    return View(living = coordinates, width = viewport.width, height = viewport.height)
}

fun Coordinate.isBelow(other: Coordinate): Boolean = y <= other.y
fun Coordinate.isAbove(other: Coordinate): Boolean = y > other.y
fun Coordinate.isRightOf(other: Coordinate): Boolean = x >= other.x
fun Coordinate.isLeftOf(other: Coordinate): Boolean = x < other.x
fun Coordinate.between(topLeft: Coordinate, bottomRight: Coordinate) =
    isBelow(topLeft) && isRightOf(topLeft) && isAbove(bottomRight) && isLeftOf(bottomRight)

fun Coordinate.translateToView(origin: Coordinate) = Coordinate(x = x - origin.x, y = -y + origin.y)
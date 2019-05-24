package io.pivotal.game.of.life.core

data class Plane(
    val living: List<Coordinate>
) {

    fun isAlive(coordinate: Coordinate) = living.contains(coordinate)

    fun willLive(coordinate: Coordinate): Boolean {

        val livingNeighbors = livingNeighbors(coordinate)

        if (livingNeighbors == 3) return true

        return living.contains(coordinate) && livingNeighbors == 2
    }

    private fun livingNeighbors(coordinate: Coordinate) =
        coordinate
            .neighbors
            .filter { isAlive(it) }
            .count()

    override fun equals(other: Any?): Boolean = other is Plane && living.containsAll(other.living)

    override fun hashCode() = living.hashCode()

    companion object {

        fun plane(vararg livingCoordinate: Coordinate) = Plane(living = livingCoordinate.asList())
    }
}

data class Coordinate(
    val x: Long,
    val y: Long
) {

    operator fun plus(other: Coordinate) = Coordinate(x = x + other.x, y = y + other.y)

    companion object {

        infix fun Int.by(y: Int) = Coordinate(x = toLong(), y = y.toLong())
    }
}

private val relativeNeighbors = sequenceOf(
    Coordinate(x = 0, y = 1),
    Coordinate(x = 1, y = 1),
    Coordinate(x = 1, y = 0),
    Coordinate(x = 1, y = -1),
    Coordinate(x = 0, y = -1),
    Coordinate(x = -1, y = -1),
    Coordinate(x = -1, y = 0),
    Coordinate(x = -1, y = 1)
)

val Plane.possibleLivingCells: Sequence<Coordinate>
    get() = living.flatMap { it.neighbors.toList() }.toSet().asSequence()

val Plane.next: Plane
    get() = Plane(living = possibleLivingCells.filter { willLive(it) }.toList())

val Coordinate.neighbors: Sequence<Coordinate> get() = relativeNeighbors.map { this + it }
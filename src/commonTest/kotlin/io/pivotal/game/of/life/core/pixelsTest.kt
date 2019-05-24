package io.pivotal.game.of.life.core

import io.pivotal.game.of.life.core.Coordinate.Companion.by
import io.pivotal.game.of.life.core.View.Companion.view
import kotlin.test.Test
import kotlin.test.assertTrue

class PixelsTest {

    @Test
    fun as_many_pixels_as_cells() {

        val squares = mutableListOf<Square>()

        view(2, 2, 0 by 0).paint(canvas = Canvas(width = 2, height = 2)) { squares.add(it) }

        val allSquaresPainted = listOf(
            Square(upperLeft = 0 by 0, dimension = 1, color = "white"),
            Square(upperLeft = 0 by 1, dimension = 1, color = "black"),
            Square(upperLeft = 1 by 0, dimension = 1, color = "black"),
            Square(upperLeft = 1 by 1, dimension = 1, color = "black")
        )
            .map { squares.contains(it) }
            .reduce { acc, b -> acc && b }

        assertTrue(allSquaresPainted)
    }

}
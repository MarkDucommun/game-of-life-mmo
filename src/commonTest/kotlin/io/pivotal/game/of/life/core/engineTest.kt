package io.pivotal.game.of.life.core

import io.pivotal.game.of.life.core.Plane.Companion.plane
import io.pivotal.game.of.life.core.Coordinate.Companion.by
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse

class EngineTest {

    @Test
    fun cells_without_two_or_three_neighbors_die() {

        plane(0 by 0) shouldBecome emptyPlane
    }

    @Test
    fun cell_with_two_or_more_neighbors_will_live() {

        plane(0 by 0, -1 by 1, 1 by -1) shouldBecome plane(0 by 0)
    }

    @Test
    fun dead_cell_with_three_living_neighbors_will_be_raised_from_the_dead() {

        plane(-1 by 0, 0 by 1, 1 by 0) shouldBecome plane(0 by 0, 0 by 1)
    }

    @Test
    fun living_cell_with_four_living_neighbors_will_die() {

        assertFalse(plane(-1 by 0, 0 by 1, 1 by 0, 0 by 0, 0 by -1).next.isAlive(0 by 0))
    }

    @Test
    fun blinker_blinks() {

        horizontalBlinker shouldBecome verticalBlinker
    }

    private infix fun Plane.shouldBecome(nextPlane: Plane) {
        assertEquals(nextPlane, next)
    }
}
package io.pivotal.game.of.life.core

import kotlin.test.Test
import io.pivotal.game.of.life.core.Coordinate.Companion.by
import io.pivotal.game.of.life.core.Plane.Companion.plane
import io.pivotal.game.of.life.core.View.Companion.view
import kotlin.test.assertEquals

class ViewportTest {

    @Test
    fun horizontal_blinker_at_origin_minus_one_by_one() {

        horizontalBlinker.toView(Viewport(origin = -1 by 1, width = 3, height = 3)) shouldBe view(
            3,
            3,
            0 by 1,
            1 by 1,
            2 by 1
        )
    }

    @Test
    fun negative_coordinates() {

        plane(-100 by -100).toView(Viewport(origin = -100 by -99, width = 3, height = 3)) shouldBe view(3, 3, 0 by 1)
    }

    private infix fun View.shouldBe(view: View) {
        assertEquals(view, this)
    }
}
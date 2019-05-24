package io.pivotal.game.of.life.core

import io.pivotal.game.of.life.core.Plane.Companion.plane
import io.pivotal.game.of.life.core.Coordinate.Companion.by

val emptyPlane = plane()

val horizontalBlinker = plane(-1 by 0, 0 by 0, 1 by 0)

val verticalBlinker = plane(0 by -1, 0 by 0, 0 by 1)
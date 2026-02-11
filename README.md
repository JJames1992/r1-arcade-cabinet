# 🕹️ R1 Arcade Cabinet

> **Retro black & white arcade game collection for Rabbit R1**

A complete arcade experience featuring 10 classic-style games with authentic Japanese arcade aesthetics, orientation-aware controls, and immersive 8-bit feedback.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Platform: Rabbit R1](https://img.shields.io/badge/Platform-Rabbit%20R1-orange.svg)
![Python](https://img.shields.io/badge/Python-3.8+-green.svg)

## 🎮 Features

- **10 Complete Games**: From classic Pong to innovative Tempest Tunnel
- **Pure Monochrome Aesthetic**: Clean black & white pixel art (240x282 resolution)
- **Orientation-Aware**: Portrait and landscape modes with smart control mapping
- **Hardware-Optimized**: Full utilization of scroll wheel, PTT button, IMU (tilt/shake), haptics
- **Japanese Arcade Style**: Konami/Taito-inspired vending machine UI and cabinet framing
- **Difficulty Scaling**: Easy, Normal, Hard, Expert modes across all games
- **High Score System**: Persistent leaderboards with slot machine-style initial entry
- **Attract Mode**: Auto-demo cycling after 30 seconds of inactivity

---

## 📋 Game Collection

### 1. **Pong** (Landscape)
Classic two-paddle ball game. Player vs CPU, first to 11 points wins.
- **Controls**: Wheel = paddle movement, PTT = serve ball
- **Highlights**: CPU AI scales with difficulty, dynamic ball speed

### 2. **Pinball** (Portrait)
Single-table pinball with plunger, dual flippers, and cabinet shake mechanics.
- **Controls**: Wheel = plunger charge, PTT = flippers, Shake = nudge (tilt risk)
- **Highlights**: 3 balls, combo multipliers, bumpers, ramps, tilt penalty system

### 3. **Side Scrolling Shooter** (Landscape)
Horizontal auto-scrolling shoot-'em-up with endless waves and power-ups.
- **Controls**: Wheel = ship vertical position, PTT = fire weapon
- **Highlights**: Shield, screen bomb, rapid fire power-ups; progressive difficulty

### 4. **Marble Maze** (Portrait)
Tilt-based maze navigation through progressive levels.
- **Controls**: IMU tilt = marble movement, PTT = reset level
- **Highlights**: No time limit, holes to avoid, increasingly complex mazes

### 5. **Rock Paper Scissors** (Portrait)
Best 3 out of 5 against CPU with visual countdown.
- **Controls**: Wheel = select choice, PTT = confirm (auto-locks at "SHOOT!")
- **Highlights**: CPU pattern detection on higher difficulties

### 6. **Cannon Knockdown** (Portrait)
Artillery-style target shooting with angle and power adjustment.
- **Controls**: Wheel = cannon angle, PTT hold = charge power (release to fire)
- **Highlights**: Physics-based projectiles, limited shots, progressive rounds

### 7. **Stack Tower** (Portrait)
Isometric tile stacking with shearing physics. Endless high score chase.
- **Controls**: PTT = drop tile
- **Highlights**: Perfect alignment bonus, shrinking platform, escalating speed

### 8. **Dice Roller** (Portrait)
Dual-mode: Simple roller (1-6 dice) + Perudo game (Liar's Dice vs CPU).
- **Controls**: Wheel = dice count/bid selection, Shake = roll, PTT = confirm
- **Highlights**: Best 3 of 5 Perudo rounds, CPU bluffing AI

### 9. **Log Roller** (Landscape)
Balance character on accelerating log. Endless survival.
- **Controls**: Wheel = character balance left/right
- **Highlights**: Progressive speed increase, water turbulence, 3 lives

### 10. **Tempest Tunnel** (Landscape)
Half-tunnel (180°) shooter. Rotate around rim, shoot enemies from depth.
- **Controls**: Wheel = position on rim, PTT = fire weapon
- **Highlights**: Endless waves, varied enemy types (basic, weaving, splitting, fast)

---

## 🏗️ Project Structure

```
r1-arcade-cabinet/
├── README.md                 # This file
├── LICENSE                   # MIT License
├── requirements.txt          # Python dependencies
├── .gitignore               # Python .gitignore
├── main.py                  # Entry point, menu system
├── games/                   # Game modules
│   ├── __init__.py
│   ├── pong.py
│   ├── pinball.py
│   ├── side_scroller.py
│   ├── marble_maze.py
│   ├── rps.py
│   ├── cannon.py
│   ├── stack_tower.py
│   ├── dice_roller.py
│   ├── log_roller.py
│   └── tempest.py
├── core/                    # Core infrastructure
│   ├── __init__.py
│   ├── input_handler.py     # Wheel, PTT, IMU abstraction
│   ├── renderer.py          # Black/white graphics engine
│   ├── audio_engine.py      # 8-bit sound/music system
│   ├── haptic_controller.py # Vibration feedback
│   ├── high_score_manager.py # Persistent high scores
│   └── orientation_manager.py # Portrait/landscape handling
├── assets/                  # Game assets
│   ├── sprites/            # Pixel art assets (PNG)
│   ├── audio/              # 8-bit SFX and music (WAV/OGG)
│   └── fonts/              # 5x7 pixel fonts
└── config/                 # Configuration
    └── settings.json       # Difficulty, high scores
```

---

## ⚙️ Technical Specifications

### Hardware Requirements
- **Device**: Rabbit R1
- **Screen**: 240x282 pixels (portrait native)
- **Color Depth**: 1-bit (black & white only)
- **Inputs**: Scroll wheel (analog), PTT button, IMU (accelerometer/gyro)
- **Outputs**: Speaker (mono audio), Haptic motor

### Orientation System
**Critical Design Rule**: Wheel input direction MUST match movement direction
- **Portrait (0°)**: Wheel controls vertical movement/adjustment
- **Landscape (90°CW)**: Wheel controls horizontal movement/adjustment
- Applies to games, menus, high score entry, quit dialogs

### Universal Controls
- **5-Second PTT Hold**: Opens quit menu (works in all games)
- **Quit Menu**: Wheel = navigate (orientation-aware), PTT = confirm

### Feedback System
- **Audio**: 8-bit chiptune, Japanese arcade-inspired (Konami/Taito style)
- **Haptic**: Context-appropriate vibration (10-150ms, variable intensity)
- **Visual**: Screen flashes, particle effects, cabinet border framing

---

## 🚀 Development Setup

### Prerequisites
```bash
# Python 3.8+ required
python --version

# Install dependencies (once requirements.txt is created)
pip install -r requirements.txt
```

### Rabbit R1 Creations Deployment
1. Clone this repository
2. Follow [Rabbit R1 Creations documentation](https://rabbit.tech/creations) for deployment
3. Ensure SDK access to:
   - Scroll wheel input API
   - PTT button event API
   - IMU sensor data API
   - Haptic motor control API
   - Audio output API

### Local Development (Emulator)
*(Instructions to be added once R1 emulator/simulator details are available)*

---

## 🎯 Roadmap

### Phase 1: Core Infrastructure ✅
- [x] Repository setup
- [ ] Input abstraction layer (wheel, PTT, IMU)
- [ ] Black/white rendering engine
- [ ] Orientation manager
- [ ] Audio/haptic controllers
- [ ] Menu skeleton

### Phase 2: Proof of Concept Game
- [ ] Implement **Stack Tower** (simplest mechanics)
- [ ] Validate tech stack and input responsiveness
- [ ] Establish performance baseline (target 60fps)

### Phase 3: Core Game Set
- [ ] Pong (landscape, AI opponent)
- [ ] Rock Paper Scissors (menu navigation patterns)
- [ ] Log Roller (endless survival mechanics)
- [ ] Marble Maze (IMU validation)

### Phase 4: Advanced Games
- [ ] Side Scrolling Shooter (sprite management, enemy AI)
- [ ] Cannon Knockdown (physics simulation)
- [ ] Tempest Tunnel (3D perspective rendering)
- [ ] Dice Roller (dual-mode, Perudo AI)

### Phase 5: Flagship Game
- [ ] Pinball (most complex: plunger, flippers, bumpers, shake, tilt)

### Phase 6: Polish
- [ ] High score entry system (slot machine visuals)
- [ ] Attract mode (demo clips)
- [ ] Audio pass (music, SFX balance)
- [ ] Haptic tuning
- [ ] Performance optimization

---

## 📖 Documentation

For complete technical specification including:
- Detailed game mechanics and controls
- Visual design guidelines
- Audio design system
- Haptic feedback specifications
- High score persistence
- Difficulty scaling formulas
- Testing & validation checklist

See: **[SPECIFICATION.md](SPECIFICATION.md)** *(to be added)*

---

## 🤝 Contributing

Contributions are welcome! This is an open-source project designed for the Rabbit R1 community.

### Development Guidelines
1. Follow the orientation-aware control principle (wheel direction = movement direction)
2. Maintain pure black & white aesthetic (no grayscale)
3. Keep pixel art clean and crisp (no anti-aliasing)
4. Ensure <50ms input lag for responsive arcade feel
5. Test all difficulty levels for proper scaling
6. Include haptic + audio + visual feedback for all interactions

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

Free to use, modify, and distribute. Attribution appreciated!

---

## 🙏 Acknowledgments

- Inspired by classic Japanese arcade cabinets (Konami, Taito, Namco)
- Built for the Rabbit R1 community
- Thanks to all contributors and testers

---

## 📞 Contact

- **Repository**: https://github.com/JJames1992/r1-arcade-cabinet
- **Issues**: [GitHub Issues](https://github.com/JJames1992/r1-arcade-cabinet/issues)
- **Discussions**: [GitHub Discussions](https://github.com/JJames1992/r1-arcade-cabinet/discussions)

---

**Made with ❤️ for Rabbit R1** | *Version 0.1.0-alpha* | *Generated: February 11, 2026*

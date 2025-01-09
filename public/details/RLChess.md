# Reinforcement Learning Chess Project

This project applies **Reinforcement Learning (RL)** algorithms to the game of **chess**, exploring various training methods and offering a GUI where users can play against trained AI agents. Currently, two main approaches are implemented:

1. **Deep Q-Network (DQN)**
2. **Neural MCTS** (a simplified AlphaZero-like approach)

These agents can train by playing against each other in different match-ups, and you can also challenge the trained models using a graphical interface.

---

## 1. Project Overview

Below is a brief pipeline of how the system operates:

![System Pipeline](https://github.com/user-attachments/assets/e11e9151-bbb6-4aa9-89a5-e277ba206ed5)

### 1.1 DQN vs MCTS vs Neural MCTS

The core script (`train_main.py`) demonstrates training matches between:

- **MCTS vs DQN**  
- **MCTS vs Neural MCTS**  
- **DQN vs Neural MCTS**

Each approach has its own network architecture or search mechanism, and the script handles:
- **Save/Load** of model weights (if weight files exist, the script resumes training, otherwise it starts anew).
- Logging of game results (win/draw/loss) for each matchup.

### 1.2 Future Plans

The project aims to **continue investigating RL** methods using chess as a flexible environment, with potential expansions such as:
- More advanced neural architectures (e.g. deeper residual blocks)
- Novel exploration strategies
- Improved MCTS variants

---

## 2. Training Logic

### 2.1 DQN Training

The **DQN agent** (see `ChessAgent` in `train_main.py`) uses a convolutional network (`ChessNet`) to map chess board states to Q-values for all possible moves (indexed from 0 to 4095, representing 64×64 potential moves).  
- **Replay Memory**: Stores `(state, action, reward, next_state, done)` tuples.  
- **Target Network**: Periodically updated to stabilise training.  
- **Epsilon-Greedy**: Balances exploration vs. exploitation.  
- **Loss Function**: MSE between predicted Q-values and target Q-values (`reward + gamma * max(next_Q)`).

### 2.2 Simplified AlphaZero (Neural MCTS)

A **neural MCTS** approach (see `ChessNetAlpha` + `neural_mcts_search`) combines:
- **Policy & Value Heads**: The network outputs both a move policy vector (size 4096) and a scalar value in `[-1, 1]`.  
- **MCTS with PUCT Formula**: Expands nodes based on the network’s policy distribution.  
- **Cyclic Re-Expansion**: Nodes are re-visited, updated via backpropagation of a “virtual win/loss” from simulations.

### 2.3 Training Scenarios

1. **MCTS vs DQN**  
   - White: DQN Agent  
   - Black: Classical MCTS (with a tweak to avoid immediate reverse moves)
   - The DQN learns from self-play experiences, saving to `dqn_agent.pth`.

2. **MCTS vs Neural MCTS**  
   - White: Neural MCTS  
   - Black: Simplified MCTS (again with reverse-move avoidance)
   - The neural model is saved to `neural_mcts_chess.pth`.

3. **DQN vs Neural MCTS**  
   - White: Neural MCTS  
   - Black: DQN  
   - Both sides load existing weights if available; otherwise, they start from scratch.

---

## 3. GUI to Play Against Trained Agents

A **Tkinter-based GUI** (`gui_chess.py`) offers a simple chessboard interface:
- **Engine Select**: Choose MCTS, DQN, or Neural MCTS.
- **Load Trained Weights**: If files (`dqn_agent.pth`, `neural_mcts_chess.pth`) exist, they will be used to power AI moves.
- **Real-Time Interaction**: Click squares to move pieces, and watch the chosen AI respond.  
- **Game Over Detection**: Automatically reports checkmate or draw.

**Note**: This GUI is for demonstration; feel free to enhance it for user experience, styling, or advanced features (e.g., highlight possible moves, track move history, etc.).

---

## 4. Getting Started

1. **Install Dependencies**  
   - Python 3.7+  
   - PyTorch  
   - python-chess  
   - NumPy, SciPy, etc.  
   (See `requirements.txt` in your environment if available.)

2. **Run Training**  
   ```bash
   python train_main.py [mode]
   ```
   - `mode` can be `1` (MCTS vs DQN), `2` (MCTS vs Neural MCTS), or `3` (DQN vs Neural MCTS).

3. **Play Against a Trained Model**  
   ```bash
   python gui_chess.py
   ```
   - Select “MCTS”, “DQN”, or “Neural MCTS” from the dropdown, then click “New Game”. Make your moves by clicking squares, and the AI will respond.

---

## 5. Future Directions

- **Advanced Architecturest**: Larger or deeper networks, residual blocks, attention mechanisms.
- **Scalable Self-Play**: Implementing a distributed system to gather experiences from multiple games in parallel.
- **Improved Search Methods**: Integrating advanced variants of MCTS or novel exploration strategies.
- **Chess Variants**: Investigating RL on variants like Chess960, or other board games altogether.

---

## 6. Conclusion
This project demonstrates how **Reinforcement Learning** can be applied to the complex domain of chess, providing a baseline with **DQN** and a **simplified AlphaZero-like approach**. It includes:

- **Training scripts** for multiple matchups.
- **Model checkpointing** and resumption.
- **A simple GUI** to challenge the trained agents.

With further research and implementation refinements, these methods can continue to advance our understanding of RL strategies in adversarial, high-dimensional environments like chess.
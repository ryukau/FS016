# WebGLでCyclic Cellular Automata(Cyclic CA)

観賞用です。

##　Cyclic CAとは

セルオートマトンの1つ。

ルールを決定する4つのパラメータがある。

- R - Range 近傍の範囲
- T - Threshold 状態遷移に必要な状態を持つ近傍の数
- C - Colors 状態の数 (0..C-1)
- N - Neighborhood 近傍の種類。Moore近傍は NM 、von Neumann近傍は NN と表記される。

例えば Stripes というルールは R3/T4/C5/NN のように表記される。

世代交代は次のように行われる。

- 一つのセルは (0..C-1) のいずれかの状態を持つ。
- 状態 c のセルの近傍に、状態　mod(c + 1, C) のセルが T 個以上あれば、セルの状態を mod(c + 1, C) とする。

## Cyclic CAルールリスト
http://www.mirekw.com/ca/rullex_cycl.html

### 動作確認済ルール

- 313 (R1/T3/C3/NM)
- 3-color bootstrap (R2/T11/C3/NM)
- Amoeba (R3/T10/C2/NN)
- Black vs White (R5/T23/C2/NN)
- Cubism (R2/T5/C3/NN)
- Fossil debris (R2/T9/C4/NM)
- Imperfect (R1/T2/C4/NM)
- LavaLamp (R2/T10/C3/NM)
- Maps (R2/T3/C5/NN)
- Perfect (R1/T3/C4/NM)
- Stripes (R3/T4/C5/NN)

### 動作しなかったルール

- CCA (R1/T1/C14/NN, C15なら動く)
- Cyclic spirals (R3/T5/C8/NM)
- Squarish Spirals (R2/T2/C6/NN)
- Turbulent phase (R2/T5/C8/NM)

### C3/NN Cubismに似たルール

T_R

- T_0  = 1 // 存在しない
- T_1  = 2
- T_2  = 5
- T_3  = 10
- T_4  = 17
- T_5  = 26
- T_6  = 37
- T_7  = 50
- T_8  = 65
- T_9  = 82
- T_10 = 101
- T_11 = 122
- T_12 = 145

Rを増やした時の大まかな予想値

```
T_R = 2*R - 1 + T_R-1
```

### C4/NM Imperfectの発展

R毎の発振しない最小のT。

予想だが、Tは何らかの値を整数に丸めたものだろう。
また、画面端がつながっている場合は以下の値では収束しないかも。

- R1/T2, Imperfect
- R2/T5
- R3/T9
- R4/T14
- R5/T21
- R6/T29
- R7/T38, T37は不安定だが、初期状態によっては発振しない
- R8/T48
- R9/T59, T58は不安定
- R10/T74, T71 vec2(4000000.0, 2000.0))で収束を確認

Rを増やした時の大まかな予想値

```
T_R = R + 2 + T_R-1
```

## バグ

- C6以上に設定すると挙動がおかしくなる。

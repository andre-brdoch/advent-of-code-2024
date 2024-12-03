![advent of code banner](/public/header.png)

# advent-of-code-2024

https://adventofcode.com/2024

🎅 🎄 🎁 🎅 🎄 🎁 🎅 🎄 🎁 🎅 🎄 🎁 🎅 🎄 🎁 🎅 🎄 🎁

## Rules

- Typescript
- 0 dependencies, except for tooling like Typescript and Eslint const startVal = Object.fromEntries
- No AI
- Take it easy. No ambition to solve everything or to score on the leaderboard, just having fun when I have time ([Unlike 2022 when I grinded through all 25 puzzles](https://github.com/andre-brdoch/advent-of-code-2022))

## Progress

1. [Solution](https://github.com/andre-brdoch/advent-of-code-2024/tree/main/src/day-01) ⭐⭐
2. [Solution](https://github.com/andre-brdoch/advent-of-code-2024/tree/main/src/day-02) ⭐⭐
3. [Solution](https://github.com/andre-brdoch/advent-of-code-2024/tree/main/src/day-03) ⭐⭐
4. TBD
5. TBD
6. TBD
7. TBD
8. TBD
9. TBD
10. TBD
11. TBD
12. TBD
13. TBD
14. TBD
15. TBD
16. TBD
17. TBD
18. TBD
19. TBD
20. TBD
21. TBD
22. TBD
23. TBD
24. TBD
25. TBD

## Learnings

- Read the challenges carefully! Solving the wrong problem is a big waste of time
- The challenges give us free tests cases - use those exact ones in unit tests
- `[11, 2].sort()` does NOT yield `[2, 11]` - They get sorted by their first digit. Need to do `[11, 2].sort((a, b) => a - b)`
- Being able to isolate/skip test cases is important when debugging (yes, looking at you, Node test runner! Why is this such a pain with you?)
- Make sure the test data does not have an empty extra line at the end, or consider it when parsing it. When testing the parsing, use if possible the real input files and not inline strings, as they might be missing small details like that additional empty extra line.

## Installation

```bash
# expected: 21.x.x
node -v
# otherwise, install
nvm install 21
nvm use 21

# install dependencies
npm i
```

## Development

```bash
# run all days
npm run aoc
# run a specific day
npm run aoc -- --day=1
# run in watch mode
npm run aoc -- --watch
# run only tests marked as only
npm run aoc -- --only

# run all validations
npm run validate
```

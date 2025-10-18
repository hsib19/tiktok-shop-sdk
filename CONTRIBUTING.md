# Contribution Guidelines

Thank you for considering contributing to the **TikTok Shop SDK**! Contributions help improve the SDK for everyone. Please follow the guidelines below to make the process smooth and efficient.

## How to Contribute

1. **Fork the repository**
   Create your own copy of the repo by clicking "Fork" on GitHub.

2. **Create a branch**
   Use descriptive branch names for your work:

   ```bash
   git checkout -b feature/your-feature
   git checkout -b fix/your-bug
   ```

3. **Make changes**
   - Write **type-safe TypeScript** wherever possible
   - Add **unit tests** for new features or bug fixes

4. **Run tests**
   Make sure all tests pass before submitting a PR:

   ```bash
   pnpm install
   pnpm run test
   pnpm run lint
   ```

5. **Commit changes**
   Use clear and conventional commit messages:

   ```
   feat(module): add new feature
   fix(module): fix a bug
   chore: update dependencies or tooling
   ```

6. **Push branch to your fork**

   ```bash
   git push origin feature/your-feature
   ```

7. **Open a Pull Request (PR)**
   - Target the `main` branch of the main repo
   - Provide a **clear description** of your changes
   - Link any related issues if applicable

## Testing

- Unit tests are written with **Jest**
- Run all tests:

  ```bash
  pnpm run test
  pnpm run test:cov   # with coverage report
  ```

## Additional Notes

- Be respectful and constructive in your code and comments
- Contributions are welcome from anyone, and **all improvements are valued**
- If unsure, open an **issue first** to discuss before submitting a PR

# 1. Створення нової гілки від develop
git checkout develop
git pull origin develop
git checkout -b feature/complex-integration

# 2. Внесення змін
# Додавання нової функції у файл featureX.py
echo "def new_function():\n    pass\n" >> featureX.py
git add featureX.py
git commit -m "Add new function in featureX.py"

# Виправлення помилки у файлі bugfix.py
echo "# Bug fixed\n" >> bugfix.py
git add bugfix.py
git commit -m "Fix bug in bugfix.py"

# Оновлення документації у README.md
echo "## New feature description\n" >> README.md
git add README.md
git commit -m "Update documentation in README.md"

# 3. Імітація командної співпраці
# Інший член команди об'єднав свою гілку feature/team-member з develop
git checkout develop
git pull origin develop
git merge --no-ff feature/team-member
git push origin develop

# Перенесення вашої гілки feature/complex-integration на оновлену гілку develop
git checkout feature/complex-integration
git rebase develop

# Вирішення конфліктів
# (При виникненні конфліктів виправляйте їх вручну, додавайте файли та продовжуйте ребазування)
# Припустимо, що конфлікт виник у файлі conflict-file.py
# Відкрийте цей файл і виправте конфлікт, потім:
# git add conflict-file.py
# git rebase --continue

# 4. Інтерактивне відновлення для чистої історії
git rebase -i develop

# Під час інтерактивного ребазування оберіть squash або edit для відповідних коммітів

# 5. Фінальна інтеграція та виштовхування
# Об'єднання гілки feature/complex-integration з develop
git checkout develop
git pull origin develop
git merge --no-ff feature/complex-integration
git push origin develop

# Перенесення змін до віддаленого сховища
git push origin feature/complex-integration

# Перевірка чистоти та зрозумілості історії коммітів
git log --oneline --graph --decorate

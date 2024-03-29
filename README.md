## Setup

Execute composer:

```
composer install
```

Build the database and the schema with:
```
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate
```

If you want dummy data for dev env execute (Warning do not use on prod env):
```
php bin/console doctrine:fixtures:load
```
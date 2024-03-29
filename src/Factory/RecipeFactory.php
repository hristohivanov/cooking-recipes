<?php

namespace App\Factory;

use App\Entity\Recipe;
use App\Repository\RecipeRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Recipe>
 *
 * @method        Recipe|Proxy                     create(array|callable $attributes = [])
 * @method static Recipe|Proxy                     createOne(array $attributes = [])
 * @method static Recipe|Proxy                     find(object|array|mixed $criteria)
 * @method static Recipe|Proxy                     findOrCreate(array $attributes)
 * @method static Recipe|Proxy                     first(string $sortedField = 'id')
 * @method static Recipe|Proxy                     last(string $sortedField = 'id')
 * @method static Recipe|Proxy                     random(array $attributes = [])
 * @method static Recipe|Proxy                     randomOrCreate(array $attributes = [])
 * @method static RecipeRepository|RepositoryProxy repository()
 * @method static Recipe[]|Proxy[]                 all()
 * @method static Recipe[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Recipe[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Recipe[]|Proxy[]                 findBy(array $attributes)
 * @method static Recipe[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Recipe[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class RecipeFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'content' => self::faker()->text(6400),
            'owner' => UserFactory::new(),
            'publishedAt' => \DateTimeImmutable::createFromMutable(self::faker()->dateTimeBetween('-1 year')),
            'title' => sprintf('%s %s with %s',
                ['Glazed', 'Fried', 'Roasted', 'Smoked', 'Baked', 'Braised', 'Steamed', 'Boiled'][rand(0, 7)],
                ['burger', 'pizza', 'fish', 'stew', 'soup', 'cheese', 'bread', 'cake'][rand(0, 7)],
                ['sour cream', 'broccoli', 'avocado', 'eggs', 'flour'][rand(0, 4)]
            )


        ];
    }

    protected function initialize(): self
    {
        return $this
            // ->afterInstantiate(function(Recipe $recipe): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Recipe::class;
    }
}

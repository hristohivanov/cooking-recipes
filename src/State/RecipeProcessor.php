<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Recipe;
use Symfony\Bundle\SecurityBundle\Security;

final readonly class RecipeProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $innerProcessor,
        private Security           $security
    ){}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Recipe
    {

        if ($data instanceof  Recipe && $data->getOwner() === null && $this->security->getUser()) {
            $data->setOwner($this->security->getUser());
        }

        return $this->innerProcessor->process($data, $operation, $uriVariables, $context);
    }
}

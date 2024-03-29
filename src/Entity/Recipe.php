<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\RecipeRepository;
use App\State\RecipeProcessor;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(security: "is_granted('ROLE_USER')", processor: RecipeProcessor::class),
        new Get(),
        new Patch(security: "is_granted('ROLE_ADMIN') or object.owner == user"),
        new Delete(security: "is_granted('ROLE_ADMIN') or object.owner == user"),
    ],
    order: ['id' => 'desc'],
    paginationItemsPerPage: 12,
)]
#[ApiFilter(SearchFilter::class, properties: [
    'title' => 'ipartial',
])]
class Recipe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\Length(255, 8)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\Length(65000, 2000)]
    private ?string $content = null;

    #[ORM\Column]
    #[ApiProperty(
        writable: false
    )]
    private ?\DateTimeImmutable $publishedAt ;

    #[ORM\ManyToOne(inversedBy: 'recipe')]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiProperty(
        writable: false
    )]
    #[ApiFilter(SearchFilter::class, strategy: 'exact')]
    public ?User $owner = null;

    public function __construct()
    {
        $this->publishedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    #[ApiProperty]
    public function getContent(): ?string
    {
        return $this->content;
    }

    #[ApiProperty]
    public function getShortContent(): ?string
    {
        return substr($this->content, 0,100) . '...';
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getPublishedAt(): ?\DateTimeImmutable
    {
        return $this->publishedAt;
    }

    public function getPublishedAtFormatted(): string
    {
        return $this->publishedAt->format('d/m/y H:i');
    }

    /**
     * @param \DateTimeImmutable|null $publishedAt
     */
    public function setPublishedAt(?\DateTimeImmutable $publishedAt): void
    {
        $this->publishedAt = $publishedAt;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function getOwnerUsername(): string
    {
        return $this->owner->getUsername();
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;
        
        return $this;
    }
    
}

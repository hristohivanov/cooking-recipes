<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class MainController extends AbstractController
{
    #[Route('/', name:'index')]
    public function homepage(#[CurrentUser] $loggedUser = null): Response
    {
        return $this->render('/home.html.twig', [
            'loggedUser' => $loggedUser
        ]);
    }
}
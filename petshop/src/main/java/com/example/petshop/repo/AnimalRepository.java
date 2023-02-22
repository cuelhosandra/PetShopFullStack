package com.example.petshop.repo;

import com.example.petshop.models.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AnimalRepository extends JpaRepository<Animal, UUID> {


    boolean existsByNumeroCadastro(String numeroCadastro);
}

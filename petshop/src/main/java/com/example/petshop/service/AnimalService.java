package com.example.petshop.service;

import jakarta.transaction.Transactional;
import com.example.petshop.models.Animal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.petshop.repo.AnimalRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AnimalService {

    @Autowired
    AnimalRepository animalRepository;

    public List<Animal> findAll() {
        return animalRepository.findAll();
    }

    @Transactional
    public Animal save(Animal animal) {
        return animalRepository.save(animal);
    }

    @Transactional
    public void delete(Animal animal) {
        animalRepository.delete(animal);
    }

    public Optional<Animal> findById(UUID id) {
        return animalRepository.findById(id);
    }

    public boolean existsByNumeroCadastro(String numeroCadastro) {
        return animalRepository.existsByNumeroCadastro(numeroCadastro);
    }
}

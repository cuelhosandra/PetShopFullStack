package com.example.petshop.controller;

import com.example.petshop.dtos.AnimalDto;
import jakarta.validation.Valid;
import com.example.petshop.models.Animal;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.petshop.service.AnimalService;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/animais")
public class AnimalController {

    final AnimalService animalService;

    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @PostMapping
    public ResponseEntity<Object> saveAnimal(@RequestBody @Valid AnimalDto animalDto) {
        if (animalService.existsByNumeroCadastro(animalDto.getNumeroCadastro())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("ERRO: Cadastro já existe");
        }

        var animal = new Animal();
        BeanUtils.copyProperties(animalDto, animal);
        animal.setDataRegistro(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(animalService.save(animal));
    }

    @GetMapping
    public ResponseEntity<List<Animal>> getAllAnimal(){
        return ResponseEntity.status(HttpStatus.OK).body(animalService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneAnimal(@PathVariable(value = "id") UUID id){
        Optional<Animal> animalOptional = animalService.findById(id);
        if (!animalOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Animal não encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(animalOptional.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteAnimal(@PathVariable(value = "id") UUID id) {
        Optional<Animal> animalOptional = animalService.findById(id);
        if (!animalOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Animal não encontrado");
        }
        animalService.delete(animalOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Animal deletado com sucesso");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateAnimal(@PathVariable(value = "id") UUID id,
                                               @RequestBody @Valid AnimalDto animalDto){
        Optional<Animal> animalOptional = animalService.findById(id);
        if(!animalOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Animal não encontrado");
        }
        var animal = animalOptional.get();

        animal.setNumeroCadastro(animalDto.getNumeroCadastro());
        animal.setNomeAnimal(animalDto.getNomeAnimal());
        animal.setEspecieAnimal(animalDto.getEspecieAnimal());
        animal.setRacaAnimal(animalDto.getRacaAnimal());
        animal.setAlturaAnimal(animalDto.getAlturaAnimal());
        animal.setPesoAnimal(animalDto.getPesoAnimal());
        animal.setTipoPelagem(animalDto.getTipoPelagem());
        return ResponseEntity.status(HttpStatus.OK).body(animalService.save(animal));

    }
}

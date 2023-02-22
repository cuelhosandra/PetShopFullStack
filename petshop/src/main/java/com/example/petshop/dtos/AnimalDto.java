package com.example.petshop.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AnimalDto {


    @NotBlank
    private String numeroCadastro;

    @NotBlank
    private String nomeAnimal;

    @NotBlank
    private String especieAnimal;

    @NotBlank
    private String racaAnimal;

    @NotBlank
    private String alturaAnimal;

    @NotBlank
    private String pesoAnimal;

    @NotBlank
    private String tipoPelagem;


    public String getNomeAnimal() {
        return nomeAnimal;
    }

    public String getNumeroCadastro() {
        return numeroCadastro;
    }

    public void setNumeroCadastro(String numeroCadastro) {
        this.numeroCadastro = numeroCadastro;
    }

    public void setNomeAnimal(String nomeAnimal) {
        this.nomeAnimal = nomeAnimal;
    }

    public String getEspecieAnimal() {
        return especieAnimal;
    }

    public void setEspecieAnimal(String especieAnimal) {
        this.especieAnimal = especieAnimal;
    }

    public String getRacaAnimal() {
        return racaAnimal;
    }

    public void setRacaAnimal(String racaAnimal) {
        this.racaAnimal = racaAnimal;
    }

    public String getAlturaAnimal() {
        return alturaAnimal;
    }

    public void setAlturaAnimal(String alturaAnimal) {
        this.alturaAnimal = alturaAnimal;
    }

    public String getPesoAnimal() {
        return pesoAnimal;
    }

    public void setPesoAnimal(String pesoAnimal) {
        this.pesoAnimal = pesoAnimal;
    }

    public String getTipoPelagem() {
        return tipoPelagem;
    }

    public void setTipoPelagem(String tipoPelagem) {
        this.tipoPelagem = tipoPelagem;
    }
}

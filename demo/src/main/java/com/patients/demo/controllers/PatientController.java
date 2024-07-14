package com.patients.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.patients.demo.models.Patient;
import com.patients.demo.repository.PatientRepository;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/patient")

public class PatientController {
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public List<Patient> GetAllPatient(){
        return patientRepository.findAll();
    }

    @PostMapping
    public Patient create (@RequestBody Patient patient){
        return patientRepository.save(patient);
    }

    @PutMapping()
    public String editById(@RequestBody Patient patient){
        patientRepository.save(patient);
        return "berhasil diperbaharui";
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id){
        patientRepository.deleteById(id);
        return "berhasil dihapus";
    }
}



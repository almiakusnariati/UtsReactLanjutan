package com.patients.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.patients.demo.models.Patient;

public interface PatientRepository extends JpaRepository <Patient, Long>{

    
    
}

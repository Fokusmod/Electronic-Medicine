package com.electronic.medicine.repository;

import com.electronic.medicine.entity.Role;
import com.electronic.medicine.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {


    Optional<User> getByEmail(String email);

    Optional<User> getByActivationCode(String code);

    @EntityGraph(attributePaths = {"roles"}, type = EntityGraph.EntityGraphType.LOAD)
    List<User> findAllByRoles(Role role);

    @Query("select u from User u join fetch u.specialities s where s.title = :title")
    List<User> getSpecialistByTitle(String title);

}

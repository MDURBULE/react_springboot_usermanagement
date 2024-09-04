package com.main.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import com.main.entity.User;

public interface userRepository extends JpaRepository<User, Long> {
//	@Query("SELECT u FROM User u WHERE u.id =:id")
	public User getUserById(Long Id);
}

package com.main.services;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.main.dao.userRepository;
import com.main.entity.User;

@Component
public class userServices {
	@Autowired
	private userRepository userRepo;
	
	public User addUser(User user) {
		return this.userRepo.save(user);
	}
	
	public List<User> getAllUser(){
		return (List<User>) this.userRepo.findAll();
	}
	
	public void updateUser(User user,Long id) {
		user.setId(id);
		this.userRepo.save(user);
	}
	
	public void deleteUser(Long id) {
		this.userRepo.deleteById(id);
	}
	
	public User getUserById(Long id) {
		User user = null;
		user = this.userRepo.getUserById(id);
		return user;
	}

}

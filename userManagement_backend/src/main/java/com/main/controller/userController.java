package com.main.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.main.entity.User;
import com.main.services.userServices;

@RestController
@CrossOrigin("http://localhost:5173")
public class userController {
	
	@Autowired
	private userServices userService;
	
	
	@PostMapping("/user")
	public ResponseEntity<User> addUser(@RequestBody User user){
		User u = null;
		try {
			u =(User) this.userService.addUser(user);
			return ResponseEntity.of(Optional.of(u));
		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers(){
		List<User> list = this.userService.getAllUser();
		if(list.size()<=0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.of(Optional.of(list));
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<User> getUser(@PathVariable("id") Long id){
		User user = this.userService.getUserById(id);
		if(user==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.of(Optional.of(user));
	}
	
	@PutMapping("/user/{id}")
	public ResponseEntity<Void> updateUser(@RequestBody User user,@PathVariable("id") Long id){
		try {
			this.userService.updateUser(user, id);
			return ResponseEntity.ok().build();
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@DeleteMapping("/user/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id){
		try {
			this.userService.deleteUser(id);
			return ResponseEntity.ok().build();
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}

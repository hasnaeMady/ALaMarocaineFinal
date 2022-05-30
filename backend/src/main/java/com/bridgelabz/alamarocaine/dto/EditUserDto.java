package com.bridgelabz.alamarocaine.dto;
import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import lombok.Data;
@Data
@Component
public class EditUserDto {
		private String name;
		private Long mobileNumber;
		private String email;
		private String password;
		private LocalDateTime updatedAt;
		
}

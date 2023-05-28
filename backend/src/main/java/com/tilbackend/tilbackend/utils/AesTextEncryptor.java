package com.tilbackend.tilbackend.utils;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.security.crypto.encrypt.AesBytesEncryptor;
import org.springframework.security.crypto.encrypt.BytesEncryptor;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.BytesKeyGenerator;
import org.springframework.security.crypto.keygen.KeyGenerators;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class AesTextEncryptor implements TextEncryptor {

  private final BytesEncryptor bytesEncryptor;

  public AesTextEncryptor(String data, String salt) {
    BytesKeyGenerator keyGenerator = KeyGenerators.secureRandom(16);
    Dotenv dotenv = Dotenv.configure().load();
    bytesEncryptor = new AesBytesEncryptor(data, salt, keyGenerator);
  }

  @Override
  public String encrypt(String data) {
    byte[] encryptedBytes = bytesEncryptor.encrypt(data.getBytes(StandardCharsets.UTF_8));
    return Base64.getEncoder().encodeToString(encryptedBytes);
  }

  @Override
  public String decrypt(String encryptedData) {
    byte[] decryptedBytes = bytesEncryptor.decrypt(Base64.getDecoder().decode(encryptedData));
    return new String(decryptedBytes, StandardCharsets.UTF_8);
  }
 }

package twilight.sparkle.crm.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
  private static final String SECRET_KEY = "replace_this_with_a_very_long_secret_key_123456789012345678901234567890";

  private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

  public String generateToken(String username) {
    long now = System.currentTimeMillis();
    return Jwts.builder().setSubject(username).setIssuedAt(new Date(now))
      .setExpiration(new Date(now + 3600_000)).signWith(key, SignatureAlgorithm.HS256).compact();
  }

  public String extractUsername(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
  }

  public boolean isTokenValid(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (JwtException e) {
      return false;
    }
  }
}

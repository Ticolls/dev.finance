package com.ticolls.dev_finance_backend.infra.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ticolls.dev_finance_backend.entities.User;
import com.ticolls.dev_finance_backend.repositories.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();

        if (path.equals("/auth/signin") || path.equals("/auth/login")) {
            SecurityContextHolder.getContext().setAuthentication(null);
            filterChain.doFilter(request, response);
        } else {
            Cookie[] cookies = request.getCookies();
            String token = "";
            

            for (int i = 0; i < cookies.length; i++) {
                if (cookies[i].getName().equals("token")) {
                    token = cookies[i].getValue();
                    break;
                }
            }
            
            token = this.recoveyToken(token);

            if (token != null) {

                String email = tokenService.validateToken(token);

                User user = userRepository.findByEmail(email);

                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);
        }
        
    }

    private String recoveyToken(String token) {

        if (token == null || token == "") {
            return null;
        }

        return token.replace("Bearer ", "");
    }
}

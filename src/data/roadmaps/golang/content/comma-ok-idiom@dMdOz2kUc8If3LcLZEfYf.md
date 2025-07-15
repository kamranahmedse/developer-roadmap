# Comma-Ok Idiom

Pattern for safely testing map key existence or type assertion success using `value, ok := map[key]` or `value, ok := interface.(Type)`. Returns both value and boolean status, preventing panics and distinguishing zero values from missing keys.
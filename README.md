# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

---

## Despliegue en GitHub Pages

Este proyecto está configurado para exportar el sitio Next.js como estático y publicarlo en GitHub Pages.

### Pasos para agregar nuevas diapositivas y actualizar el sitio

1. **Agrega tus nuevas diapositivas** en el proyecto local (por ejemplo, en la carpeta correspondiente).
2. **Instala la dependencia de despliegue** (solo la primera vez):
   ```bash
   npm install --save-dev gh-pages
   ```
3. **Genera y despliega el sitio** ejecutando:
   ```bash
   npm run deploy
   ```
   Esto generará la carpeta `out/` y subirá automáticamente su contenido a la rama `gh-pages`.
4. **Verifica la configuración de GitHub Pages**:
   - Ve a la configuración del repositorio en GitHub.
   - En la sección "Pages", selecciona la rama `gh-pages` y la carpeta raíz (`/`).
   - Guarda los cambios.
5. **¡Listo!** Tu sitio estará disponible desde cualquier dispositivo accediendo a la URL de GitHub Pages.

> Repite este flujo cada vez que agregues o modifiques diapositivas.

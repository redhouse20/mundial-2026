# 🏆 MUNDIAL FIFA 2026 - Red House

Simulador interactivo del Campeonato Mundial de Fútbol FIFA 2026. Ingresa resultados, sigue la tabla de posiciones y visualiza el torneo completo en tiempo real.

## ✨ Características

- ⚽ **Fase de Grupos**: 12 grupos (A-L) con 4 equipos cada uno
- 🎯 **Fase Eliminatoria**: Dieciseisavos, Octavos, Cuartos, Semifinales y Final
- 🏅 **Sistema de Terceros**: Cálculo automático de los mejores 8 terceros lugares
- 📊 **Tablas en Vivo**: Posiciones actualizadas según criterios FIFA (puntos, diferencia de gol, goles a favor)
- 🎮 **Entrada Dinámica**: Carga resultados y ve los cruces completarse automáticamente
- 💾 **Persistencia**: Todos los datos se guardan localmente en tu navegador
- 🎨 **Diseño Dark Mode**: Interfaz moderna con tema oscuro y acentos rojo
- 📱 **Responsive**: Funciona perfectamente en desktop, tablet y móvil

## 🚀 Acceso Rápido

**Versión en Vivo**: [https://redhouse20.github.io/mundial-2026](https://redhouse20.github.io/mundial-2026)

## 📋 Cómo Usar

1. **Ingresa Resultados**: En la sección "Fase de Grupos", completa los marcadores de los partidos
2. **Sigue las Posiciones**: Las tablas se actualizan automáticamente
3. **Navega las Fases**: Usa los botones de navegación para ver Dieciseisavos, Octavos, Cuartos, etc.
4. **Consulta el Podio**: Visualiza el campeón, subcampeón y tercer puesto en la sección final
5. **Reinicia**: Usa "Restablecer Torneo" para limpiar todos los datos

## 🏗️ Estructura del Proyecto

```
mundial-2026/
├── index.html      # Estructura HTML
├── styles.css      # Estilos y tema dark
├── script.js       # Lógica del simulador
└── README.md       # Este archivo
```

## 🔧 Tecnología

- **HTML5**: Semántica y estructura
- **CSS3**: Grid, Flexbox, Variables CSS
- **JavaScript Vanilla**: Sin dependencias externas
- **LocalStorage**: Almacenamiento local de datos

## 📊 Datos del Torneo 2026

- **32 Equipos** en 12 grupos
- **64 Partidos** en fase de grupos
- **16 Cruces** en dieciseisavos de final
- **Sistema FIFA**: Clasificación automática según reglamento oficial

### Grupos

| Grupo | Equipos |
|-------|---------|
| **A** | México, USA, Canadá, Nueva Zelanda |
| **B** | Argentina, Ecuador, Venezuela, Emiratos Árabes |
| **C** | Francia, Túnez, Austria, Jamaica |
| **D** | Inglaterra, Colombia, Corea del Sur, Sudáfrica |
| **E** | Brasil, Suiza, Ghana, Panamá |
| **F** | España, Perú, Ucrania, Costa Rica |
| **G** | Alemania, Japón, Camerún, Chile |
| **H** | Italia, Senegal, Polonia, Paraguay |
| **I** | Portugal, Marruecos, Suecia, Australia |
| **J** | Países Bajos, Nigeria, Turquía, Arabia Saudita |
| **K** | Bélgica, Croacia, Argelia, Irán |
| **L** | Uruguay, Egipto, Gales, Escocia |

## 💾 Persistencia de Datos

Todos tus resultados se guardan automáticamente en `localStorage`. Tus datos persisten incluso si cierras y vuelves a abrir el navegador.

**Para limpiar datos**: Haz clic en "Restablecer Torneo" (confirma la acción).

## 🎨 Personalización

Puedes modificar los colores editando las variables CSS en `styles.css`:

```css
:root {
    --primary: #C00000;      /* Rojo principal */
    --bg-color: #0b0b0b;     /* Fondo oscuro */
    --text-color: #FFFFFF;   /* Texto blanco */
}
```

## 📱 Compatibilidad

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navegadores móviles (iOS, Android)

## 🔒 Privacidad

- No hay conexión a internet requerida (excepto GitHub Pages)
- Todos los datos se guardan localmente en tu dispositivo
- Sin servidores, sin tracking, sin cookies de terceros

## 📄 Licencia

Este proyecto está disponible bajo licencia MIT. Úsalo libremente para proyectos personales, educativos o comerciales.

## 🤝 Contribuciones

¿Ideas de mejoras? Puedes:
- Hacer fork del repositorio
- Crear una rama con tu feature
- Hacer commit de tus cambios
- Push a la rama
- Abrir un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, abre un issue en el repositorio.

---

**Hecho con ❤️ por Red House**

*¡Que disfrutes simulando el Mundial 2026!*
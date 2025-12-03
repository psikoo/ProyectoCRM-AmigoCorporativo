import { ChangeDetectionStrategy, Component, signal, computed, effect, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importación para NgClass
import { FormsModule } from '@angular/forms'; // Necesario para ngModel

// --- Definición del Contrato de Accesorios ---

interface Accessory {
  id: string;
  name: string;
  svgPath: string; // La ruta SVG específica para este accesorio
  color?: string;  // Color principal para este accesorio
  extraPath?: string; // Para detalles como la corbata en el traje
  extraColor?: string;
}

// Datos de la mascota y accesorios para el robot
const ACCESSORIES_DATA = {
  hats: [
    { id: 'none', name: 'Ninguno', svgPath: '' },
    { id: 'antenna', name: 'Antena', svgPath: 'M45 10 L55 10 L55 30 L45 30 Z M50 0 C55 0, 55 5, 50 5 C45 5, 45 0, 50 0 Z', color: '#B0C4DE' },
    { id: 'visor', name: 'Visor', svgPath: 'M30 40 L70 40 L70 50 L30 50 Z', color: '#00FFFF' },
    { id: 'halo', name: 'Halo', svgPath: 'M50 5 C65 5, 65 15, 50 15 C35 15, 35 5, 50 5 Z', color: '#FFD700' },
    // NUEVO: Sombrero de Vaquero
    { id: 'cowboy', name: 'Vaquero', svgPath: 'M20 10 L80 10 L85 35 L15 35 L20 10 Z M30 10 C30 0, 70 0, 70 10 Z', color: '#B8860B' }, 
    // NUEVO: Sombrero Negro
    { id: 'black_hat', name: 'Sombrero Negro', svgPath: 'M30 0 L70 0 L75 15 L25 15 L30 0 Z M20 15 L80 15 L80 25 L20 25 Z', color: '#111111' } 
  ] as Accessory[],
  shirts: [
    { id: 'none', name: 'Ninguno', svgPath: '' },
    { id: 'chest_plate', name: 'Pechera', svgPath: 'M25 80 L75 80 L70 120 L30 120 Z', color: '#6A5ACD' },
    { id: 'tie', name: 'Corbata', svgPath: 'M48 80 L52 80 L55 95 L45 95 Z', color: '#FF4500' },
    { id: 'vest', name: 'Chaleco', svgPath: 'M20 75 L80 75 L75 125 L25 125 Z M30 80 L70 80 L65 120 L35 120 Z', color: '#556B2F' },
    // FIX: Camiseta Blanca (Coordenadas ajustadas al torso, Y=75 a Y=115)
    { id: 'white_tshirt', name: 'Camiseta Blanca', svgPath: 'M20 75 L80 75 L80 115 L20 115 Z', color: '#F0F0F0' } 
  ] as Accessory[],
  arms: [
    { id: 'none', name: 'Manos básicas', svgPath: '' },
    // CLAW: Hacemos la garra más grande y que sobresalga
    { id: 'claws', name: 'Garras', svgPath: 'M10 110 L5 120 L15 120 Z M85 110 L95 120 L85 120 Z', color: '#808080' },
    // WRENCHES: Hacemos las llaves más grandes y con mejor forma
    { id: 'wrenches', name: 'Llaves', svgPath: 'M10 110 L2 120 L18 120 L10 110 Z M90 110 L98 120 L82 120 L90 110 Z', color: '#FFD700' },
    // ROBOT HANDS: Hacemos la mano un rectángulo más grande y sólido
    { id: 'robot_hands', name: 'Manos Robot', svgPath: 'M5 110 L20 110 L20 120 L5 120 Z M80 110 L95 110 L95 120 L80 120 Z', color: '#C0C0C0' }
  ] as Accessory[],
  eyes: [
    // FIX 1: Opción para volver a los cuadrados por defecto, renombrada a 'Ninguno'
    { id: 'none', name: 'Ninguno', svgPath: '' }, 
    // FIX 2: Opción 'Puntos' con el SVG path correcto
    { id: 'dots', name: 'Puntos', svgPath: 'M35 45 A5 5 0 1 0 35 45 M65 45 A5 5 0 1 0 65 45 Z', color: 'black' },
    { id: 'lines', name: 'Barras', svgPath: 'M30 55 L40 55 L40 60 L30 60 Z M60 55 L70 55 L70 60 L60 60 Z', color: '#FFD700' },
    { id: 'cyclops', name: 'Cíclope', svgPath: 'M30 40 L70 40 L70 60 L30 60 Z', color: '#FF00FF' },
    { id: 'heart', name: 'Corazón', svgPath: 'M40 50 A5 5 0 1 0 50 50 A5 5 0 1 0 60 50 L50 65 L40 50 Z', color: '#FF1493' }
  ] as Accessory[],
  // NUEVA CATEGORÍA: Trajes Completos
  fullSuits: [
    { id: 'none', name: 'Ninguno', svgPath: '' },
    { 
        id: 'dark_suit', 
        name: 'Traje Ejecutivo', 
        // Capa principal del traje (cubre cuerpo y brazos base)
        svgPath: 'M15 75 L85 75 L85 125 L15 125 Z', 
        color: '#1C1C1C', 
        // Corbatín visible y solapas
        extraPath: 'M45 75 L55 75 L50 90 Z', 
        extraColor: '#FFFFFF' // Corbata Blanca
    }
  ] as Accessory[],
};

// --- Opciones de Colores Base ---
const BASE_COLORS = [
    { id: 'default', name: 'Gris Plata', head: '#C0C0C0', body: '#D3D3D3' },
    { id: 'blue', name: 'Azul Eléctrico', head: '#00BFFF', body: '#1E90FF' },
    { id: 'red', name: 'Rojo Corporativo', head: '#FF6347', body: '#FF4500' },
    { id: 'yellow', name: 'Amarillo Sol', head: '#FFEB3B', body: '#FFC107' },
    { id: 'purple', name: 'Morado Real', head: '#9370DB', body: '#8A2BE2' },
];

// --- Componente Angular ---

@Component({
  selector: 'app-root', // Mantengo app-root por el entorno de Canvas, pero debería ser 'app-virtual-assistant' en tu proyecto.
  standalone: true,
  imports: [CommonModule, FormsModule], // Importar FormsModule para [(ngModel)]
  template: `
    <!-- Contenedor Principal Flotante/Maximizador -->
    <!-- Se añade 'user-select: none' para evitar la selección de texto al arrastrar -->
    <div [ngClass]="isMaximized() ? maximizedClasses : floatingClasses"
         [class.ease-out-bounce]="!isDragging()"
         [class.auto-walk-animation]="canWalk() && !isDragging()"
         [style.right]="isMaximized() ? '' : robotPosition().x"
         [style.bottom]="isMaximized() ? '' : robotPosition().y"
         class="transition-all duration-500"
         (mouseup)="stopDrag()" 
         (mouseleave)="stopDrag()" 
         (mousemove)="drag($event)"
         (touchend)="stopDrag()" 
         (touchmove)="drag($event)"
         (click)="resetTimers()"
         style="user-select: none;">
      
      <!-- Fondo Oscurecido (Backdrop) en modo maximizado -->
      @if (isMaximized()) {
          <div class="absolute inset-0 bg-gray-900 opacity-70 transition-opacity duration-500" (click)="toggleMaximize()"></div>
      }

      <!-- Contenedor del Robot y Panel (Centrado o en Esquina) -->
      <div [ngClass]="isMaximized() ? maximizedContentClasses : floatingContentClasses">
          
          <!-- 1. Sprite/Mascota Flotante (Ahora con doble función y ARRASTRABLE) -->
          <div #robotContainer
               class="relative transition-all duration-500 cursor-pointer transform hover:scale-105 float-walk"
               [ngClass]="isMaximized() ? 'w-48 h-48 mb-8' : 'w-24 h-24'"
               (mousedown)="startDrag($event)"
               (touchstart)="startDrag($event)">
            
            <!-- Botón de Cerrar (Solo en modo maximizado) -->
            @if (isMaximized()) {
                <button (click)="toggleMaximize(); $event.stopPropagation()"
                        class="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full p-2 shadow-xl hover:bg-gray-200 z-10">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            }

            <!-- Icono/Cuerpo de la Mascota -->
            <div class="w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg" 
                   [ngClass]="isMaximized() ? 'w-36 h-36' : 'w-16 h-16'"
                   [class.walking-legs]="canWalk()"
                   [class.sleeping-robot]="robotMood() === 'Dormido'">
                
                <!-- Cuerpo Base del Robot (SIEMPRE VISIBLE) -->
                <!-- Cabeza -->
                <rect x="25" y="30" width="50" height="40" rx="5" ry="5" [attr.fill]="selectedColor().head" stroke="#808080" stroke-width="2"/>
                <!-- Cuerpo -->
                <rect x="20" y="75" width="60" height="50" rx="8" ry="8" [attr.fill]="selectedColor().body" stroke="#A9A9A9" stroke-width="2"/>
                <!-- Cuello -->
                <rect x="45" y="70" width="10" height="5" [attr.fill]="selectedColor().head"/>
                <!-- Brazos y Manos Base (SIEMPRE VISIBLES COMO ESTRUCTURA) -->
                <rect x="15" y="80" width="5" height="30" fill="#808080"/>
                <rect x="80" y="80" width="5" height="30" fill="#808080"/>
                
                <!-- PIERNAS -->
                <rect id="left-leg" class="leg-left" x="30" y="125" width="10" height="20" rx="2" ry="2" 
                      [attr.fill]="selectedColor().body" stroke="#808080" stroke-width="1"/>
                <rect id="right-leg" class="leg-right" x="60" y="125" width="10" height="20" rx="2" ry="2" 
                      [attr.fill]="selectedColor().body" stroke="#808080" stroke-width="1"/>
                
                <!-- Pies -->
                <rect x="25" y="145" width="20" height="5" rx="2" ry="2" fill="#808080"/>
                <rect x="55" y="145" width="20" height="5" rx="2" ry="2" fill="#808080"/>
                
                <!-- Capa: TRAJE COMPLETO (Overlay sobre el cuerpo base) -->
                @if (selectedSuit() && selectedSuit()?.id !== 'none') {
                    <path [attr.d]="selectedSuit()?.svgPath" [attr.fill]="selectedSuit()?.color || 'currentColor'" stroke="#000000" stroke-width="1"/>
                    
                    <!-- Detalle Extra: Corbata (para contraste) -->
                    @if (selectedSuit()?.extraPath) {
                        <path [attr.d]="selectedSuit()?.extraPath" [attr.fill]="selectedSuit()?.extraColor || 'currentColor'" stroke="#000000" stroke-width="0.5"/>
                    }
                }

                <!-- Capa: Camiseta/Pechera (Shirt) - SOLO si NO hay traje completo -->
                @if (selectedShirt() && selectedShirt()?.id !== 'none' && selectedSuitId() === 'none') {
                  <path [attr.d]="selectedShirt()?.svgPath" [attr.fill]="selectedShirt()?.color || 'currentColor'" stroke="#000000" stroke-width="1" />
                }
                
                <!-- Capa: Brazos/Herramientas (Arms) - SOLO si NO hay traje completo -->
                <!-- FIX DE MANOS: Se dibujan sobre el final de los brazos base -->
                @if (selectedArm() && selectedArm()?.id !== 'none' && selectedSuitId() === 'none') {
                  <path [attr.d]="selectedArm()?.svgPath" [attr.fill]="selectedArm()?.color || 'currentColor'" stroke="#000000" stroke-width="1" />
                }
                
                <!-- Capa: Sombrero/Antena (Hat) -->
                @if (selectedHat() && selectedHat()?.id !== 'none') {
                  <path [attr.d]="selectedHat()?.svgPath" [attr.fill]="selectedHat()?.color || 'currentColor'" stroke="#000000" stroke-width="1" />
                }

                <!-- Capa: Ojos (Eyes) - FIX: La lógica usa selectedEyeId() para determinar si mostrar el path o los rects por defecto -->
                @if (selectedEyeId() !== 'none' && selectedEye()) {
                    <g [attr.fill]="selectedEye()?.color || 'currentColor'">
                        <!-- Dibuja la ruta SVG del accesorio seleccionado (Puntos, Cíclope, etc.) -->
                        <path [attr.d]="selectedEye()?.svgPath"/>
                    </g>
                } @else {
                    <!-- Ojos por defecto (cuadrados negros) si 'none' o ningún accesorio está seleccionado -->
                    <rect x="35" y="40" width="10" height="10" fill="black"/>
                    <rect x="55" y="40" width="10" height="10" fill="black"/>
                }
                
              </svg>
            </div>
            
            <!-- Indicador de Estado/Mood -->
            <span class="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                <!-- Muestra el estado personalizado si 'Otro...' está seleccionado -->
                {{ selectedMoodIsCustom() ? (customMoodInput() || '...') : robotMood() }}
            </span>
          </div>

          <!-- 2. Panel de Personalización (Aparece al hacer click en el modo maximizado) -->
          @if (isMaximized() && isCustomizerOpen()) {
            <div class="bg-white p-5 rounded-xl shadow-2xl w-[400px] border border-gray-200 animate-slide-in-up max-h-[80vh] overflow-y-auto">
              <h2 class="text-2xl font-extrabold text-indigo-600 mb-4 border-b pb-2">Configuración del Amigo Robótico</h2>
              
              <div class="space-y-4">
                
                <!-- Selector de Color Base del Robot -->
                <div class="border-b pb-3">
                  <label class="block text-sm font-medium text-gray-700 mb-2">🎨 Color Base</label>
                  <div class="flex flex-wrap gap-2">
                    @for (item of baseColors; track item.id) {
                      <button (click)="selectColor(item.id)"
                              [class.ring-2]="selectedColorId() === item.id"
                              [class.ring-indigo-500]="selectedColorId() === item.id"
                              class="p-2 text-xs rounded-lg border transition duration-150"
                              [style.background-color]="item.body"
                              [class.text-white]="item.id !== 'default'"
                              [class.text-gray-900]="item.id === 'default'">
                        {{ item.name }}
                      </button>
                    }
                  </div>
                </div>

                <!-- NUEVA SECCIÓN: TRAJE COMPLETO / DISFRAZ -->
                <div class="border-b pb-3">
                  <label class="block text-sm font-medium text-gray-700 mb-2">👔 Traje Completo / Disfraz</label>
                  <div class="flex flex-wrap gap-2">
                    @for (item of fullSuits; track item.id) {
                      <button (click)="selectAccessory('suit', item.id)"
                              [class.ring-2]="selectedSuitId() === item.id"
                              [class.ring-indigo-500]="selectedSuitId() === item.id"
                              class="p-2 text-xs rounded-lg border transition duration-150"
                              [class.bg-indigo-50]="selectedSuitId() === item.id"
                              [class.bg-gray-100]="selectedSuitId() !== item.id">
                        {{ item.name }}
                      </button>
                    }
                  </div>
                </div>

                <!-- Selector de Sombrero/Antena --><div class="border-b pb-3">
                  <label class="block text-sm font-medium text-gray-700 mb-2">📡 Sombrero/Antena</label>
                  <div class="flex flex-wrap gap-2">
                    @for (item of hats; track item.id) {
                      <button (click)="selectAccessory('hat', item.id)"
                              [class.ring-2]="selectedHatId() === item.id"
                              [class.ring-indigo-500]="selectedHatId() === item.id"
                              class="p-2 text-xs rounded-lg border transition duration-150"
                              [class.bg-indigo-50]="selectedHatId() === item.id"
                              [class.bg-gray-100]="selectedHatId() !== item.id">
                        {{ item.name }}
                      </button>
                    }
                  </div>
                </div>

                <!-- Selector de Pechera/Corbata --><div class="border-b pb-3" [class.opacity-40]="selectedSuitId() !== 'none'">
                  <label class="block text-sm font-medium text-gray-700 mb-2">👔 Pechera/Corbata</label>
                  <div class="flex flex-wrap gap-2">
                    @for (item of shirts; track item.id) {
                      <button (click)="selectAccessory('shirt', item.id)"
                              [disabled]="selectedSuitId() !== 'none'"
                              [class.ring-2]="selectedShirtId() === item.id"
                              [class.ring-indigo-500]="selectedShirtId() === item.id"
                              class="p-2 text-xs rounded-lg border transition duration-150 disabled:cursor-not-allowed"
                              [class.bg-indigo-50]="selectedShirtId() === item.id"
                              [class.bg-gray-100]="selectedShirtId() !== item.id">
                        {{ item.name }}
                      </button>
                    }
                  </div>
                  @if (selectedSuitId() !== 'none') {
                      <p class="text-xs text-red-500 mt-1">Deshabilitado: Cubierto por Traje Completo.</p>
                  }
                </div>

                <!-- Selector de Brazos/Manos --><div class="border-b pb-3" [class.opacity-40]="selectedSuitId() !== 'none'">
                  <label class="block text-sm font-medium text-gray-700 mb-2">🦾 Brazos/Manos</label>
                  <div class="flex flex-wrap gap-2">
                    @for (item of arms; track item.id) {
                      <button (click)="selectAccessory('arm', item.id)"
                              [disabled]="selectedSuitId() !== 'none'"
                              [class.ring-2]="selectedArmId() === item.id"
                              [class.ring-indigo-500]="selectedArmId() === item.id"
                              class="p-2 text-xs rounded-lg border transition duration-150 disabled:cursor-not-allowed"
                              [class.bg-indigo-50]="selectedArmId() === item.id"
                              [class.bg-gray-100]="selectedArmId() !== item.id">
                        {{ item.name }}
                      </button>
                    }
                  </div>
                  @if (selectedSuitId() !== 'none') {
                      <p class="text-xs text-red-500 mt-1">Deshabilitado: Cubierto por Traje Completo.</p>
                  }
                </div>

                <!-- Selector de Ojos --><div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">👁️ Ojos</label>
                  <div class="flex flex-wrap gap-2">
                    @for (item of eyes; track item.id) {
                      <button (click)="selectAccessory('eye', item.id)"
                              [class.ring-2]="selectedEyeId() === item.id"
                              [class.ring-indigo-500]="selectedEyeId() === item.id"
                              class="p-2 text-xs rounded-lg border transition duration-150"
                              [class.bg-indigo-50]="selectedEyeId() === item.id"
                              [class.bg-gray-100]="selectedEyeId() !== item.id">
                        {{ item.name }}
                      </button>
                    }
                  </div>
                </div>
                
                <!-- Funcionalidad Adicional: Cambio de Estado/Mood -->
                <div class="pt-4 border-t">
                  <label class="block text-sm font-medium text-gray-700 mb-2">😄 Estado del Robot</label>
                  <div class="flex flex-wrap gap-2">
                      @for (mood of moods; track mood) {
                          <button (click)="robotMood.set(mood)"
                                  [class.bg-indigo-600]="robotMood() === mood"
                                  [class.bg-gray-400]="robotMood() !== mood"
                                  class="text-white p-2 text-xs rounded-lg hover:bg-indigo-700 transition duration-150">
                              {{ mood }}
                          </button>
                      }
                  </div>
                  <!-- Input de Estado Personalizado (Solo visible si 'Otro...' está seleccionado) -->
                  @if (selectedMoodIsCustom()) {
                      <input type="text" 
                             [(ngModel)]="customMoodInput"
                             (change)="robotMood.set('Otro...')"
                             placeholder="Escribe tu estado personalizado..."
                             class="mt-3 w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"/>
                  }
                </div>

              </div>
              <button (click)="isCustomizerOpen.set(false)"
                      class="mt-4 w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition">
                Cerrar Panel
              </button>
            </div>
          }
      </div>
    </div>
    
    <style>
      /* Animación para que el panel de personalización aparezca de abajo */
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-slide-in-up {
        animation: slideInUp 0.2s ease-out forwards;
      }
      
      /* --- DRAG AND DROP / ANIMACIONES DE MOVIMIENTO --- */
      
      /* Animación de Caminar Automático (Mueve el contenedor fixed) */
      .auto-walk-animation {
          animation: walkPath 40s linear infinite alternate;
          /* Desactivar el rebote CSS mientras la animación automática está activa */
          transition: none !important; 
      }
      
      /* Define una ruta de paseo COMPACTA en la parte inferior derecha */
      @keyframes walkPath {
          0% { right: 24px; bottom: 24px; }
          25% { right: 25%; bottom: 15%; } /* Se mueve un poco hacia el centro */
          50% { right: 5%; bottom: 5%; } /* Esquina inferior izquierda (del área de movimiento) */
          75% { right: 15%; bottom: 20%; }
          100% { right: 24px; bottom: 24px; }
      }

      /* 1. Contenedor de Arrastre (solo en modo flotante) */
      .float-walk {
          /* El cursor es 'grab' (mano abierta) para indicar que es arrastrable */
          cursor: grab; 
          /* Quitar el 'transition: none !important' para que el arrastre anule suavemente la animación 'walkPath' */
          user-select: none; /* Previene la selección de texto al arrastrar */
      }
      
      /* Estilo para cuando se está arrastrando */
      .float-walk.dragging {
        cursor: grabbing; /* El cursor es 'grabbing' (mano cerrada) */
        opacity: 0.8;
      }
      
      /* Animación de Rebote (Bounce) cuando se suelta el elemento */
      .ease-out-bounce {
          /* Esta clase se añade dinámicamente cuando el arrastre se detiene */
          transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), bottom 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      /* 2. Ciclo de las piernas (se mantiene) */
      .walking-legs .leg-left {
          animation: legWalkLeft 0.5s infinite alternate;
          transform-origin: center top;
      }
      .walking-legs .leg-right {
          animation: legWalkRight 0.5s infinite alternate;
          transform-origin: center top;
      }

      @keyframes legWalkLeft {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(3px) rotate(-5deg); }
      }
      
      @keyframes legWalkRight {
          0%, 100% { transform: translateY(3px) rotate(-5deg); }
          50% { transform: translateY(0) rotate(5deg); }
      }
      
      /* --- ESTADOS DE ROBOT --- */
      
      /* ESTADO: DORMIDO (Se tumba) */
      .sleeping-robot {
          transform: rotate(90deg) scale(0.8);
          transform-origin: 50% 50%;
      }
      
      /* ESTADOS: ABURRIDO / HAMBRE (Quieto, sin transformación) */
      /* El estado quieto ya está implícito porque canWalk() es false, deteniendo la animación. */

    </style>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy {
  
  // --- ESTADO Y TIMERS ---
  isMaximized = signal(false); 
  isCustomizerOpen = signal(false);
  isDragging = signal(false);

  robotPosition = signal<{x: string, y: string}>({x: '24px', y: '24px'});
  
  private dragStartCoords: {clientX: number, clientY: number} = {clientX: 0, clientY: 0};
  private initialPositionOffset: {right: number, bottom: number} = {right: 0, bottom: 0};
  private clickThreshold = 5; 

  // TIMERS DE INACTIVIDAD Y NECESIDADES
  private idleTimer: any;
  private needTimer: any;

  // 3. Estado (Mood)
  robotMood = signal('Productivo');
  customMoodInput = signal('');
  moods = ['Productivo', 'Pensando', 'Alerta', 'Dormido', 'Hambre', 'Aburrido', 'Feliz', 'Triste', 'Enojado', 'Otro...']; 

  // --- SELECCIÓN DE ACCESORIOS (RESTO DEL CÓDIGO) ---
  selectedHatId = signal('antenna');
  selectedShirtId = signal('chest_plate');
  selectedEyeId = signal('none'); 
  selectedArmId = signal('none');
  selectedColorId = signal('default');
  selectedSuitId = signal('none');
  selectedBgColor = signal('#FFFFFF');

  // --- Clases de Posicionamiento ---
  floatingClasses = 'fixed z-50 float-walk'; 
  maximizedClasses = 'fixed inset-0 z-50 flex items-center justify-center transition-all duration-500';

  floatingContentClasses = 'relative p-4 space-y-4';
  maximizedContentClasses = 'relative z-10 flex flex-col items-center justify-center p-8 space-y-8';

  // --- Datos de Opciones (Arrays) ---
  hats = ACCESSORIES_DATA.hats;
  shirts = ACCESSORIES_DATA.shirts;
  eyes = ACCESSORIES_DATA.eyes;
  arms = ACCESSORIES_DATA.arms;
  baseColors = BASE_COLORS;
  fullSuits = ACCESSORIES_DATA.fullSuits; 

  // --- Computed Signals ---
  selectedHat = computed(() => this.hats.find(h => h.id === this.selectedHatId()));
  selectedShirt = computed(() => this.shirts.find(s => s.id === this.selectedShirtId()));
  selectedEye = computed(() => this.eyes.find(e => e.id === this.selectedEyeId()));
  selectedArm = computed(() => this.arms.find(a => a.id === this.selectedArmId()));
  selectedColor = computed(() => this.baseColors.find(c => c.id === this.selectedColorId()) || this.baseColors[0]);
  selectedSuit = computed(() => this.fullSuits.find(s => s.id === this.selectedSuitId()));
  selectedMoodIsCustom = computed(() => this.robotMood() === 'Otro...');
  
  // Condición para caminar: no maximizado, no arrastrando, y no en un estado "fijo" (como Dormido o Aburrido)
  canWalk = computed(() => 
    !this.isMaximized() && 
    !this.isDragging() && 
    !['Dormido', 'Hambre', 'Aburrido'].includes(this.robotMood())
  );

  @ViewChild('robotContainer', { read: ElementRef }) robotContainer!: ElementRef;

  constructor() {
    // Lógica para detener la animación si el robot no puede caminar
    effect(() => {
      const element = this.robotContainer?.nativeElement;
      if (!element) return;

      if (this.canWalk()) {
        element.classList.add('auto-walk-animation');
      } else {
        element.classList.remove('auto-walk-animation');
      }
    });

    // Lógica al arrastrar (mantiene la funcionalidad anterior)
    effect(() => {
        const element = this.robotContainer?.nativeElement;
        if (!element) return;
        
        if (this.isDragging()) {
            element.classList.add('dragging');
            element.classList.remove('ease-out-bounce');
        } else {
            element.classList.remove('dragging');
            element.classList.add('ease-out-bounce');
        }
    }, {allowSignalWrites: true});
  }

  ngOnInit() {
    this.robotPosition.set({x: '24px', y: '24px'});
    this.startTimers();
  }

  ngOnDestroy() {
    clearInterval(this.idleTimer);
    clearInterval(this.needTimer);
  }

  // --- GESTIÓN DE TIMERS Y COMPORTAMIENTO ---

  /**
   * Inicializa los temporizadores de inactividad y necesidades.
   */
  startTimers() {
    
    const IDLE_TIME_MS = 60000; 
    
    const NEED_TIME_MS = 300000; 

    // 1. Temporizador de Aburrimiento (10 segundos para prueba)
    this.idleTimer = setInterval(() => {
      if (!this.isMaximized() && this.robotMood() === 'Productivo') {
        this.robotMood.set('Aburrido');
      }
    }, IDLE_TIME_MS);

    // 2. Temporizador de Necesidades (30 segundos para prueba)
    this.needTimer = setInterval(() => {
      // FIX: La condición ahora permite la transición desde 'Productivo' O 'Aburrido'
      if (!this.isMaximized() && (this.robotMood() === 'Productivo' || this.robotMood() === 'Aburrido')) {
        const needs = ['Dormido', 'Hambre'];
        const randomNeed = needs[Math.floor(Math.random() * needs.length)];
        this.robotMood.set(randomNeed);
      }
    }, NEED_TIME_MS);
  }

  /**
   * Reinicia los temporizadores y devuelve el estado a 'Productivo' con cualquier interacción.
   */
  resetTimers() {
    clearInterval(this.idleTimer);
    clearInterval(this.needTimer);
    this.robotMood.set('Productivo');
    this.startTimers(); // Reiniciar ambos
  }

  // --- LÓGICA DE ARRASTRE (Se mantiene igual, pero llama a resetTimers) ---

  private getEventCoordinates(event: MouseEvent | TouchEvent): {clientX: number, clientY: number} {
    if (event instanceof MouseEvent) {
      return { clientX: event.clientX, clientY: event.clientY };
    }
    const touch = event.touches[0] || event.changedTouches[0];
    return { clientX: touch.clientX, clientY: touch.clientY };
  }

  startDrag(event: MouseEvent | TouchEvent) {
    if (this.isMaximized()) return;
    this.resetTimers(); // Interacción cuenta como actividad
    event.preventDefault(); 
    event.stopPropagation();

    const coords = this.getEventCoordinates(event);
    
    // 1. Guardar dónde se hizo click
    this.dragStartCoords = { clientX: coords.clientX, clientY: coords.clientY };

    // 2. Obtener la posición REAL del elemento (incluida la animación CSS)
    const element = event.currentTarget as HTMLElement;
    const computedStyle = window.getComputedStyle(element.parentElement!); 

    this.initialPositionOffset = {
        right: parseFloat(computedStyle.right || '0') || 0,
        bottom: parseFloat(computedStyle.bottom || '0') || 0
    };
    
    // 3. Bloquear la posición inicial en las señales para que el JS tome control
    this.robotPosition.set({
        x: `${this.initialPositionOffset.right}px`,
        y: `${this.initialPositionOffset.bottom}px`
    });

    element.parentElement!.classList.remove('auto-walk-animation');

    this.isDragging.set(true); 
  }

  drag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging() || this.isMaximized()) return;
    
    const coords = this.getEventCoordinates(event);
    const deltaX = coords.clientX - this.dragStartCoords.clientX;
    const deltaY = coords.clientY - this.dragStartCoords.clientY;

    if (Math.abs(deltaX) < this.clickThreshold && Math.abs(deltaY) < this.clickThreshold) {
        return; 
    }
    
    let newRight = this.initialPositionOffset.right - deltaX;
    let newBottom = this.initialPositionOffset.bottom - deltaY; 

    // 4. Aplicar límites de la pantalla
    const elementWidth = 96; 
    const elementHeight = 96; 

    const maxRight = window.innerWidth - elementWidth;
    const maxBottom = window.innerHeight - elementHeight;

    const finalRight = Math.max(0, Math.min(maxRight, newRight));
    const finalBottom = Math.max(0, Math.min(maxBottom, newBottom));
    
    this.robotPosition.set({
      x: `${finalRight}px`,
      y: `${finalBottom}px`
    });
  }

  stopDrag() {
    if (!this.isDragging()) return;

    const currentPos = this.robotPosition();
    const initialPos = this.initialPositionOffset;
    
    const movedX = Math.abs((parseFloat(currentPos.x) || 0) - initialPos.right);
    const movedY = Math.abs((parseFloat(currentPos.y) || 0) - initialPos.bottom);

    if (movedX < this.clickThreshold && movedY < this.clickThreshold) {
        this.toggleMaximize(); 
    }
    
    this.isDragging.set(false);
  }

  // --- Lógica de Interacción (Modificada para Timers) ---

  toggleMaximize() {
      const newState = !this.isMaximized();
      
      this.resetTimers(); // Interactuar abre menú y reinicia timers
      
      if (newState) {
          // Si maximizamos, aseguramos que el robot está en modo "Productivo" para evitar confusión
          this.robotMood.set('Productivo'); 
          const parentElement = document.querySelector('.float-walk') as HTMLElement;
          if (parentElement) {
              parentElement.classList.remove('auto-walk-animation');
          }
      }

      this.isMaximized.set(newState);
      this.isCustomizerOpen.set(newState);
  }

  toggleCustomizer() {
    this.resetTimers(); // Interactuar abre menú y reinicia timers
    this.isCustomizerOpen.update(value => !value);
  }

  selectAccessory(type: 'hat' | 'shirt' | 'eye' | 'arm' | 'suit', id: string) {
    this.resetTimers(); // Cada cambio reinicia el temporizador
    switch (type) {
      case 'hat': this.selectedHatId.set(id); break;
      case 'shirt': this.selectedShirtId.set(id); break;
      case 'eye': this.selectedEyeId.set(id); break;
      case 'arm': this.selectedArmId.set(id); break;
      case 'suit': this.selectedSuitId.set(id); break;
    }
    if (type !== 'eye' || id !== 'Otro...') {
        this.customMoodInput.set('');
    }
  }
  
  selectColor(id: string) {
      this.resetTimers(); // Cada cambio reinicia el temporizador
      this.selectedColorId.set(id);
  }
}
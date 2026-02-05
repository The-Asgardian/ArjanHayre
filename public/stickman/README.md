# Stick figure assets

- **base-walk.png** — Your Henry Stickmin–style base character (walking pose). Used as reference.
- **Rostro-generated frames** — Idle, jump, and land poses generated via Rostro MCP (`imagine` tool). The site uses these when available (see `src/js/stick-figure.js`).

**Rostro frame URLs (used on-site):**
- Idle: https://media.rostro.dev/86a2b26c-2af5-4dd3-b1a4-b09475cce874/36e87229-8825-4af9-b0e6-acb9814ba198.png
- Jump: https://media.rostro.dev/28379013-9c7f-4d07-bfb4-92c165f7dd69/b32db4da-e883-4a0c-9b14-9f89ec1586f2.png
- Land: https://media.rostro.dev/abbb197b-3829-48d3-9445-cb09bcb9f5dd/c16d518b-0add-47df-acac-5880a6049d3e.png

## Generating more frames with MCP

Once you have a valid **Replicate API token** in `~/.cursor/mcp.json` (under `image-gen` → `env` → `REPLICATE_API_TOKEN`), you can use the Image Generation MCP to create idle, jump, and land frames that match this character.

Use the **same seed** (e.g. `12345`) for all three so the model stays consistent:

1. **Idle**  
   Prompt: *Henry Stickmin style stick figure, white oval head thick black outline, thin black stick body and limbs, white mitten hands black outline, brown semicircular shoes, standing idle arms at sides, black background, cartoon clean lines, full body.*

2. **Jump**  
   Prompt: *Henry Stickmin style stick figure, same design white head black outline white hands brown shoes, jumping pose arms raised legs tucked mid-air, black background, cartoon clean lines, full body.*

3. **Land**  
   Prompt: *Henry Stickmin style stick figure, same design white head black outline white hands brown shoes, landing pose legs bent arms out for balance, black background, cartoon clean lines, full body.*

Save the generated images here (e.g. `idle.png`, `jump.png`, `land.png`) and we can switch the background figure to a sprite sheet or image-based animation.

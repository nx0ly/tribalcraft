require("esbuild").build({
    entryPoints: ["server/index.ts"],
    outdir: "dist",
    minify: true,
    platform: "node",
    banner: {
        js: `
/*
 * TribalCraft - Build bases and defeat bosses with your friends!
 * Copyright (C) 2025 TribalCraft
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
`
    }
}).then(() => console.log("Successfully built TribalCraft!"));
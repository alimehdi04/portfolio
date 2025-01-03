import type { SchemaTypeDefinition } from "sanity"
import blog from "./blog"
import author from "./author"
import project from "./project"
import profile from "./profile"

export const schemaTypes: SchemaTypeDefinition[] = [blog, author, project, profile]


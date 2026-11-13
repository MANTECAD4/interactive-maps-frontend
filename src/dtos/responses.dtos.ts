import { ClientMarkerSchema, CoordinatesSchema } from "@/dtos";
import z from "zod";

export enum ResponseMessageType {
  "CLIENT_MARKERS_LIST" = "CLIENT_MARKERS_LIST",
  "CLIENT_JOINED" = "CLIENT_JOINED",
  "CLIENT_LEFT" = "CLIENT_LEFT",
  "CLIENT_MOVED" = "CLIENT_MOVED",
  "WELCOME" = "WELCOME",
  "ERROR" = "ERROR",
}

export const WelcomeSchema = z.object({
  clientMarker: ClientMarkerSchema,
});
export const ClientMarkersListSchema = z.object({
  clientMarkers: z.array(ClientMarkerSchema),
});
export const ClientJoinedSchema = z.object({
  clientMarker: ClientMarkerSchema,
});
export const ClientLeftSchema = z.object({
  id: z.string(),
});
export const ClientMovedSchema = z.object({
  id: z.string(),
  coordinates: CoordinatesSchema,
  updatedAt: z.coerce.date(),
});

export const WebSocketResponseSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(ResponseMessageType.ERROR),
    message: z.string(),
  }),

  z.object({
    type: z.literal(ResponseMessageType.CLIENT_MARKERS_LIST),
    payload: ClientMarkersListSchema,
  }),
  z.object({
    type: z.literal(ResponseMessageType.CLIENT_JOINED),
    payload: ClientJoinedSchema,
  }),
  z.object({
    type: z.literal(ResponseMessageType.CLIENT_LEFT),
    payload: ClientLeftSchema,
  }),
  z.object({
    type: z.literal(ResponseMessageType.CLIENT_MOVED),
    payload: ClientMovedSchema,
  }),
]);

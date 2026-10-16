CREATE TYPE "public"."escopo_tipo_enum" AS ENUM('GLOBAL', 'CD', 'TRANSPORTADORA');--> statement-breakpoint
CREATE TABLE "usuario" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" varchar(255),
	"senha_hash" text,
	"ativo" boolean DEFAULT true NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usuario_username_unique" UNIQUE("username"),
	CONSTRAINT "usuario_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"codigo" varchar(60) NOT NULL,
	"nome" varchar(100) NOT NULL,
	"descricao" text,
	"ativo" boolean DEFAULT true NOT NULL,
	CONSTRAINT "role_codigo_unique" UNIQUE("codigo")
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"recurso" varchar(80) NOT NULL,
	"acao" varchar(40) NOT NULL,
	"descricao" text
);
--> statement-breakpoint
CREATE TABLE "role_permission" (
	"id_role" uuid NOT NULL,
	"id_permission" uuid NOT NULL,
	CONSTRAINT "pk_role_permission" PRIMARY KEY("id_role","id_permission")
);
--> statement-breakpoint
CREATE TABLE "usuario_role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_usuario" uuid NOT NULL,
	"id_role" uuid NOT NULL,
	"escopo_tipo" "escopo_tipo_enum" NOT NULL,
	"id_cd" uuid,
	"id_transportadora" uuid,
	"ativo" boolean DEFAULT true NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"criado_por" uuid,
	CONSTRAINT "chk_usuario_role_escopo" CHECK (
        (
          "usuario_role"."escopo_tipo" = 'GLOBAL'
          AND "usuario_role"."id_cd" IS NULL
          AND "usuario_role"."id_transportadora" IS NULL
        )
        OR
        (
          "usuario_role"."escopo_tipo" = 'CD'
          AND "usuario_role"."id_cd" IS NOT NULL
          AND "usuario_role"."id_transportadora" IS NULL
        )
        OR
        (
          "usuario_role"."escopo_tipo" = 'TRANSPORTADORA'
          AND "usuario_role"."id_cd" IS NULL
          AND "usuario_role"."id_transportadora" IS NOT NULL
        )
      )
);
--> statement-breakpoint
CREATE TABLE "motorista" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_usuario" uuid,
	"nome" varchar(150) NOT NULL,
	"ddd" varchar(2),
	"telefone" varchar(9),
	"criado_em" timestamp with time zone DEFAULT now(),
	"criado_por" uuid,
	"atualizado_em" timestamp with time zone,
	"atualizado_por" uuid,
	"deletado_em" timestamp with time zone,
	"deletado_por" uuid,
	"deletado" boolean DEFAULT false NOT NULL,
	CONSTRAINT "motorista_id_usuario_unique" UNIQUE("id_usuario")
);
--> statement-breakpoint
CREATE TABLE "transportadora" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(150) NOT NULL,
	"contato" jsonb,
	"criado_em" timestamp with time zone DEFAULT now(),
	"criado_por" uuid,
	"atualizado_em" timestamp with time zone,
	"atualizado_por" uuid,
	"deletado_em" timestamp with time zone,
	"deletado_por" uuid,
	"deletado" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cd" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(150) NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now(),
	"criado_por" uuid,
	"atualizado_em" timestamp with time zone,
	"atualizado_por" uuid,
	"deletado_em" timestamp with time zone,
	"deletado_por" uuid,
	"deletado" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "veiculo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"placa" varchar(7) NOT NULL,
	"tipo" varchar(80),
	"criado_em" timestamp with time zone DEFAULT now(),
	"criado_por" uuid,
	"atualizado_em" timestamp with time zone,
	"atualizado_por" uuid,
	"deletado_em" timestamp with time zone,
	"deletado_por" uuid,
	"deletado" boolean DEFAULT false NOT NULL,
	CONSTRAINT "veiculo_placa_unique" UNIQUE("placa")
);
--> statement-breakpoint
CREATE TABLE "viagem" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_transportadora" uuid,
	"id_motorista" uuid,
	"id_origem" uuid,
	"criado_em" timestamp with time zone DEFAULT now(),
	"criado_por" uuid,
	"atualizado_em" timestamp with time zone,
	"atualizado_por" uuid,
	"deletado_em" timestamp with time zone,
	"deletado_por" uuid,
	"deletado" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "entrega" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_viagem" uuid NOT NULL,
	"shipment" jsonb,
	"viagem" varchar(100),
	"id_destino" uuid,
	"id_veiculo" uuid,
	"hora_prevista" timestamp with time zone,
	"status" uuid,
	"criado_em" timestamp with time zone DEFAULT now(),
	"criado_por" uuid,
	"atualizado_em" timestamp with time zone,
	"atualizado_por" uuid,
	"deletado_em" timestamp with time zone,
	"deletado_por" uuid,
	"deletado" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "evento_entrega" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_entrega" uuid NOT NULL,
	"data_hora_evento" timestamp with time zone NOT NULL,
	"id_status" uuid NOT NULL,
	"id_categoria" uuid,
	"observacao" text,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"criado_por" uuid
);
--> statement-breakpoint
CREATE TABLE "ocorrencia" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_viagem" uuid,
	"id_entrega" uuid,
	"status" uuid,
	"criado_em" timestamp with time zone DEFAULT now(),
	"criado_por" uuid,
	"atualizado_em" timestamp with time zone,
	"atualizado_por" uuid,
	"deletado_em" timestamp with time zone,
	"deletado_por" uuid,
	"deletado" boolean DEFAULT false NOT NULL,
	CONSTRAINT "chk_ocorrencia_referencia" CHECK (
        num_nonnulls(
          "ocorrencia"."id_viagem",
          "ocorrencia"."id_entrega"
        ) = 1
      )
);
--> statement-breakpoint
CREATE TABLE "ocorrencia_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_ocorrencia" uuid NOT NULL,
	"volume" varchar(100),
	"item" varchar(100),
	"categoria" uuid,
	"descricao" text,
	"status" uuid,
	"criado_em" timestamp with time zone DEFAULT now(),
	"criado_por" uuid,
	"atualizado_em" timestamp with time zone,
	"atualizado_por" uuid,
	"deletado_em" timestamp with time zone,
	"deletado_por" uuid,
	"deletado" boolean DEFAULT false NOT NULL,
	"finalizado_em" timestamp with time zone,
	"finalizado_por" uuid
);
--> statement-breakpoint
CREATE TABLE "followup" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_externo" text NOT NULL,
	"mensagem" text NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now(),
	"criado_por" uuid,
	"deletado_em" timestamp with time zone,
	"deletado" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "helpers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"grupo" varchar(100) NOT NULL,
	"codigo" varchar(80) NOT NULL,
	"descricao" varchar(255) NOT NULL,
	"ordem" integer,
	"ativo" boolean DEFAULT true NOT NULL,
	"deletado" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DROP TABLE "veiculos" CASCADE;--> statement-breakpoint
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_id_role_role_id_fk" FOREIGN KEY ("id_role") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_id_permission_permission_id_fk" FOREIGN KEY ("id_permission") REFERENCES "public"."permission"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usuario_role" ADD CONSTRAINT "usuario_role_id_usuario_usuario_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usuario_role" ADD CONSTRAINT "usuario_role_id_role_role_id_fk" FOREIGN KEY ("id_role") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usuario_role" ADD CONSTRAINT "usuario_role_id_cd_cd_id_fk" FOREIGN KEY ("id_cd") REFERENCES "public"."cd"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usuario_role" ADD CONSTRAINT "usuario_role_id_transportadora_transportadora_id_fk" FOREIGN KEY ("id_transportadora") REFERENCES "public"."transportadora"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usuario_role" ADD CONSTRAINT "usuario_role_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "motorista" ADD CONSTRAINT "motorista_id_usuario_usuario_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "motorista" ADD CONSTRAINT "motorista_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "motorista" ADD CONSTRAINT "motorista_atualizado_por_usuario_id_fk" FOREIGN KEY ("atualizado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "motorista" ADD CONSTRAINT "motorista_deletado_por_usuario_id_fk" FOREIGN KEY ("deletado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transportadora" ADD CONSTRAINT "transportadora_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transportadora" ADD CONSTRAINT "transportadora_atualizado_por_usuario_id_fk" FOREIGN KEY ("atualizado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transportadora" ADD CONSTRAINT "transportadora_deletado_por_usuario_id_fk" FOREIGN KEY ("deletado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cd" ADD CONSTRAINT "cd_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cd" ADD CONSTRAINT "cd_atualizado_por_usuario_id_fk" FOREIGN KEY ("atualizado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cd" ADD CONSTRAINT "cd_deletado_por_usuario_id_fk" FOREIGN KEY ("deletado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "veiculo" ADD CONSTRAINT "veiculo_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "veiculo" ADD CONSTRAINT "veiculo_atualizado_por_usuario_id_fk" FOREIGN KEY ("atualizado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "veiculo" ADD CONSTRAINT "veiculo_deletado_por_usuario_id_fk" FOREIGN KEY ("deletado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_id_transportadora_transportadora_id_fk" FOREIGN KEY ("id_transportadora") REFERENCES "public"."transportadora"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_id_motorista_motorista_id_fk" FOREIGN KEY ("id_motorista") REFERENCES "public"."motorista"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_id_origem_cd_id_fk" FOREIGN KEY ("id_origem") REFERENCES "public"."cd"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_atualizado_por_usuario_id_fk" FOREIGN KEY ("atualizado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "viagem" ADD CONSTRAINT "viagem_deletado_por_usuario_id_fk" FOREIGN KEY ("deletado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_id_viagem_viagem_id_fk" FOREIGN KEY ("id_viagem") REFERENCES "public"."viagem"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_id_destino_cd_id_fk" FOREIGN KEY ("id_destino") REFERENCES "public"."cd"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_id_veiculo_veiculo_id_fk" FOREIGN KEY ("id_veiculo") REFERENCES "public"."veiculo"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_status_helpers_id_fk" FOREIGN KEY ("status") REFERENCES "public"."helpers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_atualizado_por_usuario_id_fk" FOREIGN KEY ("atualizado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_deletado_por_usuario_id_fk" FOREIGN KEY ("deletado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evento_entrega" ADD CONSTRAINT "evento_entrega_id_entrega_entrega_id_fk" FOREIGN KEY ("id_entrega") REFERENCES "public"."entrega"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evento_entrega" ADD CONSTRAINT "evento_entrega_id_status_helpers_id_fk" FOREIGN KEY ("id_status") REFERENCES "public"."helpers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evento_entrega" ADD CONSTRAINT "evento_entrega_id_categoria_helpers_id_fk" FOREIGN KEY ("id_categoria") REFERENCES "public"."helpers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evento_entrega" ADD CONSTRAINT "evento_entrega_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia" ADD CONSTRAINT "ocorrencia_id_viagem_viagem_id_fk" FOREIGN KEY ("id_viagem") REFERENCES "public"."viagem"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia" ADD CONSTRAINT "ocorrencia_id_entrega_entrega_id_fk" FOREIGN KEY ("id_entrega") REFERENCES "public"."entrega"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia" ADD CONSTRAINT "ocorrencia_status_helpers_id_fk" FOREIGN KEY ("status") REFERENCES "public"."helpers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia" ADD CONSTRAINT "ocorrencia_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia" ADD CONSTRAINT "ocorrencia_atualizado_por_usuario_id_fk" FOREIGN KEY ("atualizado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia" ADD CONSTRAINT "ocorrencia_deletado_por_usuario_id_fk" FOREIGN KEY ("deletado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia_item" ADD CONSTRAINT "ocorrencia_item_id_ocorrencia_ocorrencia_id_fk" FOREIGN KEY ("id_ocorrencia") REFERENCES "public"."ocorrencia"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia_item" ADD CONSTRAINT "ocorrencia_item_categoria_helpers_id_fk" FOREIGN KEY ("categoria") REFERENCES "public"."helpers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia_item" ADD CONSTRAINT "ocorrencia_item_status_helpers_id_fk" FOREIGN KEY ("status") REFERENCES "public"."helpers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia_item" ADD CONSTRAINT "ocorrencia_item_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia_item" ADD CONSTRAINT "ocorrencia_item_atualizado_por_usuario_id_fk" FOREIGN KEY ("atualizado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia_item" ADD CONSTRAINT "ocorrencia_item_deletado_por_usuario_id_fk" FOREIGN KEY ("deletado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocorrencia_item" ADD CONSTRAINT "ocorrencia_item_finalizado_por_usuario_id_fk" FOREIGN KEY ("finalizado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "followup" ADD CONSTRAINT "followup_criado_por_usuario_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_permission_recurso_acao" ON "permission" USING btree ("recurso","acao");--> statement-breakpoint
CREATE INDEX "idx_role_permission_permission" ON "role_permission" USING btree ("id_permission");--> statement-breakpoint
CREATE INDEX "idx_usuario_role_usuario" ON "usuario_role" USING btree ("id_usuario");--> statement-breakpoint
CREATE INDEX "idx_usuario_role_role" ON "usuario_role" USING btree ("id_role");--> statement-breakpoint
CREATE INDEX "idx_usuario_role_cd" ON "usuario_role" USING btree ("id_cd");--> statement-breakpoint
CREATE INDEX "idx_usuario_role_transportadora" ON "usuario_role" USING btree ("id_transportadora");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_usuario_role_global" ON "usuario_role" USING btree ("id_usuario","id_role") WHERE "usuario_role"."escopo_tipo" = 'GLOBAL';--> statement-breakpoint
CREATE UNIQUE INDEX "uq_usuario_role_cd" ON "usuario_role" USING btree ("id_usuario","id_role","id_cd") WHERE "usuario_role"."escopo_tipo" = 'CD';--> statement-breakpoint
CREATE UNIQUE INDEX "uq_usuario_role_transportadora" ON "usuario_role" USING btree ("id_usuario","id_role","id_transportadora") WHERE "usuario_role"."escopo_tipo" = 'TRANSPORTADORA';--> statement-breakpoint
CREATE INDEX "idx_motorista_criado_por" ON "motorista" USING btree ("criado_por");--> statement-breakpoint
CREATE INDEX "idx_motorista_atualizado_por" ON "motorista" USING btree ("atualizado_por");--> statement-breakpoint
CREATE INDEX "idx_motorista_deletado_por" ON "motorista" USING btree ("deletado_por");--> statement-breakpoint
CREATE INDEX "idx_transportadora_criado_por" ON "transportadora" USING btree ("criado_por");--> statement-breakpoint
CREATE INDEX "idx_transportadora_atualizado_por" ON "transportadora" USING btree ("atualizado_por");--> statement-breakpoint
CREATE INDEX "idx_transportadora_deletado_por" ON "transportadora" USING btree ("deletado_por");--> statement-breakpoint
CREATE INDEX "idx_cd_criado_por" ON "cd" USING btree ("criado_por");--> statement-breakpoint
CREATE INDEX "idx_cd_atualizado_por" ON "cd" USING btree ("atualizado_por");--> statement-breakpoint
CREATE INDEX "idx_cd_deletado_por" ON "cd" USING btree ("deletado_por");--> statement-breakpoint
CREATE INDEX "idx_veiculo_criado_por" ON "veiculo" USING btree ("criado_por");--> statement-breakpoint
CREATE INDEX "idx_veiculo_atualizado_por" ON "veiculo" USING btree ("atualizado_por");--> statement-breakpoint
CREATE INDEX "idx_veiculo_deletado_por" ON "veiculo" USING btree ("deletado_por");--> statement-breakpoint
CREATE INDEX "idx_viagem_transportadora" ON "viagem" USING btree ("id_transportadora");--> statement-breakpoint
CREATE INDEX "idx_viagem_motorista" ON "viagem" USING btree ("id_motorista");--> statement-breakpoint
CREATE INDEX "idx_viagem_origem" ON "viagem" USING btree ("id_origem");--> statement-breakpoint
CREATE INDEX "idx_viagem_criado_por" ON "viagem" USING btree ("criado_por");--> statement-breakpoint
CREATE INDEX "idx_viagem_atualizado_por" ON "viagem" USING btree ("atualizado_por");--> statement-breakpoint
CREATE INDEX "idx_viagem_deletado_por" ON "viagem" USING btree ("deletado_por");--> statement-breakpoint
CREATE INDEX "idx_entrega_viagem" ON "entrega" USING btree ("id_viagem");--> statement-breakpoint
CREATE INDEX "idx_entrega_destino" ON "entrega" USING btree ("id_destino");--> statement-breakpoint
CREATE INDEX "idx_entrega_status" ON "entrega" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_entrega_veiculo" ON "entrega" USING btree ("id_veiculo");--> statement-breakpoint
CREATE INDEX "idx_entrega_criado_por" ON "entrega" USING btree ("criado_por");--> statement-breakpoint
CREATE INDEX "idx_entrega_atualizado_por" ON "entrega" USING btree ("atualizado_por");--> statement-breakpoint
CREATE INDEX "idx_entrega_deletado_por" ON "entrega" USING btree ("deletado_por");--> statement-breakpoint
CREATE INDEX "idx_evento_entrega_timeline" ON "evento_entrega" USING btree ("id_entrega","data_hora_evento");--> statement-breakpoint
CREATE INDEX "idx_evento_entrega_status" ON "evento_entrega" USING btree ("id_status");--> statement-breakpoint
CREATE INDEX "idx_evento_entrega_categoria" ON "evento_entrega" USING btree ("id_categoria");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_viagem" ON "ocorrencia" USING btree ("id_viagem");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_entrega" ON "ocorrencia" USING btree ("id_entrega");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_status" ON "ocorrencia" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_criado_por" ON "ocorrencia" USING btree ("criado_por");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_atualizado_por" ON "ocorrencia" USING btree ("atualizado_por");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_deletado_por" ON "ocorrencia" USING btree ("deletado_por");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_item_ocorrencia" ON "ocorrencia_item" USING btree ("id_ocorrencia");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_item_categoria" ON "ocorrencia_item" USING btree ("categoria");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_item_status" ON "ocorrencia_item" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_item_finalizado_por" ON "ocorrencia_item" USING btree ("finalizado_por");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_item_criado_por" ON "ocorrencia_item" USING btree ("criado_por");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_item_atualizado_por" ON "ocorrencia_item" USING btree ("atualizado_por");--> statement-breakpoint
CREATE INDEX "idx_ocorrencia_item_deletado_por" ON "ocorrencia_item" USING btree ("deletado_por");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_helpers_grupo_codigo" ON "helpers" USING btree ("grupo","codigo");--> statement-breakpoint
CREATE INDEX "idx_helpers_grupo_ordem" ON "helpers" USING btree ("grupo","ordem");
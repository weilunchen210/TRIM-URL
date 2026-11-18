-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile_picture_url" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "urls" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "original_url" TEXT NOT NULL,
    "shortened_url" VARCHAR(100) NOT NULL,
    "user_id" UUID NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "url_click_history" (
    "id" BIGSERIAL NOT NULL,
    "url_id" UUID NOT NULL,
    "clicked_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "url_click_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "urls_shortened_url_unique" ON "urls"("shortened_url");

-- CreateIndex
CREATE INDEX "idx_urls_user_id" ON "urls"("user_id");

-- CreateIndex
CREATE INDEX "idx_click_history_url_date" ON "url_click_history"("url_id", "clicked_date");

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url_click_history" ADD CONSTRAINT "click_history_url_fk" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "urls" ADD CONSTRAINT "urls_clicks_non_negative" CHECK ("clicks" >= 0);

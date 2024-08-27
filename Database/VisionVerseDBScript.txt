SET check_function_bodies = false
;

CREATE TABLE "Page"(
  "PageID" integer NOT NULL,
  "PageType" text,
  "Index" integer,
  "Quiz_QuizID" integer NOT NULL,
  CONSTRAINT "Page_pkey" PRIMARY KEY("PageID")
);

CREATE TABLE "Question"(
  "QuestionID" integer NOT NULL,
  "QuestionText" text,
  "Page_PageID" integer NOT NULL,
  CONSTRAINT "Question_pkey" PRIMARY KEY("QuestionID")
);

CREATE TABLE "QuestionOption"(
  "OptionID" integer NOT NULL,
  "Category" text,
  "Question_QuestionID" integer NOT NULL,
  CONSTRAINT "QuestionOption_pkey" PRIMARY KEY("OptionID")
);

CREATE TABLE "Quiz"(
  "QuizID" integer NOT NULL,
  "Name" text,
  "Description" text,
  "DateCreated" date,
  CONSTRAINT "Quiz_pkey" PRIMARY KEY("QuizID")
);

CREATE TABLE "QuizResult"(
  "ResultID" integer NOT NULL,
  "StartDate" date,
  "EndDate" date,
  "QuizAttempts" integer,
  "Quiz_QuizID" integer NOT NULL,
  CONSTRAINT "QuizResult_pkey" PRIMARY KEY("ResultID")
);

CREATE TABLE "Reward"(
  "RewardID" integer NOT NULL,
  "Name" text,
  "Barcode" bytea,
  "CategoryScore" integer,
  "Quiz_QuizID" integer NOT NULL,
  CONSTRAINT "Reward_pkey" PRIMARY KEY("RewardID")
);

CREATE TABLE "Template"(
  "TemplateID" integer NOT NULL,
  "Colour" integer,
  "Name" text,
  "User_UserID" integer NOT NULL,
  CONSTRAINT "Template_pkey" PRIMARY KEY("TemplateID")
);

CREATE TABLE "User"(
  "UserID" integer NOT NULL,
  "Username" text,
  "Password" text,
  "Email" text,
  "CreationDate" date,
  "Quiz_QuizID" integer NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY("UserID")
);

ALTER TABLE "Reward"
  ADD CONSTRAINT "Reward_Quiz_QuizID_fkey"
    FOREIGN KEY ("Quiz_QuizID") REFERENCES "Quiz" ("QuizID");

ALTER TABLE "QuizResult"
  ADD CONSTRAINT "QuizResult_Quiz_QuizID_fkey"
    FOREIGN KEY ("Quiz_QuizID") REFERENCES "Quiz" ("QuizID");

ALTER TABLE "User"
  ADD CONSTRAINT "User_Quiz_QuizID_fkey"
    FOREIGN KEY ("Quiz_QuizID") REFERENCES "Quiz" ("QuizID");

ALTER TABLE "Template"
  ADD CONSTRAINT "Template_User_UserID_fkey"
    FOREIGN KEY ("User_UserID") REFERENCES "User" ("UserID");

ALTER TABLE "Page"
  ADD CONSTRAINT "Page_Quiz_QuizID_fkey"
    FOREIGN KEY ("Quiz_QuizID") REFERENCES "Quiz" ("QuizID");

ALTER TABLE "Question"
  ADD CONSTRAINT "Question_Page_PageID_fkey"
    FOREIGN KEY ("Page_PageID") REFERENCES "Page" ("PageID");

ALTER TABLE "QuestionOption"
  ADD CONSTRAINT "QuestionOption_Question_QuestionID_fkey"
    FOREIGN KEY ("Question_QuestionID") REFERENCES "Question" ("QuestionID");

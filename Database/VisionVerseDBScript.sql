SET check_function_bodies = false;

CREATE TABLE "User" (
  "UserID" serial NOT NULL,
  "Username" text NOT NULL,
  "Password" text NOT NULL,
  "Email" text NOT NULL,
  "CreationDate" date NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY("UserID")
);

CREATE TABLE "Quiz" (
  "QuizID" serial NOT NULL,
  "Name" text NOT NULL,
  "Description" text,
  "DateCreated" date NOT NULL,
  "User_UserID" integer NOT NULL,
  "TemplateID" integer NOT NULL,
  "Layout" text,
  "IsLarge" boolean,
  CONSTRAINT "Quiz_pkey" PRIMARY KEY("QuizID"),
  CONSTRAINT "Quiz_User_UserID_fkey"
    FOREIGN KEY ("User_UserID") REFERENCES "User" ("UserID")
);

CREATE TABLE "Page" (
  "PageID" integer NOT NULL,
  "PageType" text,
  "Index" integer,
  "Quiz_QuizID" integer NOT NULL,
  CONSTRAINT "Page_pkey" PRIMARY KEY("PageID"),
  CONSTRAINT "Page_Quiz_QuizID_fkey"
    FOREIGN KEY ("Quiz_QuizID") REFERENCES "Quiz" ("QuizID")
);

CREATE TABLE "Question" (
  "QuestionID" integer NOT NULL,
  "QuestionText" text NOT NULL,
  "Page_PageID" integer NOT NULL,
  CONSTRAINT "Question_pkey" PRIMARY KEY("QuestionID"),
  CONSTRAINT "Question_Page_PageID_fkey"
    FOREIGN KEY ("Page_PageID") REFERENCES "Page" ("PageID")
);

CREATE TABLE "QuestionOption" (
  "OptionID" integer NOT NULL,
  "Category" text,
  "Question_QuestionID" integer NOT NULL,
  CONSTRAINT "QuestionOption_pkey" PRIMARY KEY("OptionID"),
  CONSTRAINT "QuestionOption_Question_QuestionID_fkey"
    FOREIGN KEY ("Question_QuestionID") REFERENCES "Question" ("QuestionID")
);

CREATE TABLE "QuizResult" (
  "ResultID" integer NOT NULL,
  "StartDate" date,
  "EndDate" date,
  "QuizAttempts" integer,
  "Quiz_QuizID" integer NOT NULL,
  CONSTRAINT "QuizResult_pkey" PRIMARY KEY("ResultID"),
  CONSTRAINT "QuizResult_Quiz_QuizID_fkey"
    FOREIGN KEY ("Quiz_QuizID") REFERENCES "Quiz" ("QuizID")
);

CREATE TABLE "Reward" (
  "RewardID" integer NOT NULL,
  "Name" text,
  "Barcode" bytea,
  "CategoryScore" integer,
  "Quiz_QuizID" integer NOT NULL,
  CONSTRAINT "Reward_pkey" PRIMARY KEY("RewardID"),
  CONSTRAINT "Reward_Quiz_QuizID_fkey"
    FOREIGN KEY ("Quiz_QuizID") REFERENCES "Quiz" ("QuizID")
);

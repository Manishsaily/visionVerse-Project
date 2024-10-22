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
  "Layout" text,
  "IsLarge" boolean,
  "ButtonColor" text NOT NULL,
  "BackgroundColor" text NOT NULL,
  "buttonStyle" text NOT NULL,
  CONSTRAINT "Quiz_pkey" PRIMARY KEY("QuizID"),
  CONSTRAINT "Quiz_User_UserID_fkey"
    FOREIGN KEY ("User_UserID") REFERENCES "User" ("UserID")
);

CREATE TABLE "Page" (
  "PageID" integer NOT NULL,
  "PageType" text,
  "Index" integer,
  "QuizID" integer NOT NULL,  -- Changed to QuizID
  CONSTRAINT "Page_pkey" PRIMARY KEY("PageID"),
  CONSTRAINT "Page_QuizID_fkey"
    FOREIGN KEY ("QuizID") REFERENCES "Quiz" ("QuizID")  -- Updated reference
);

CREATE TABLE "Question" (
  "QuestionID" serial NOT NULL,
  "QuestionText" text NOT NULL,
  "Answers" text[] NOT NULL,  -- Change to jsonb to store an array
  "QuizID" integer NOT NULL,
  CONSTRAINT "Question_pkey" PRIMARY KEY("QuestionID"),
  CONSTRAINT "Question_QuizID_fkey"
    FOREIGN KEY ("QuizID") REFERENCES "Quiz" ("QuizID")
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
  "QuizID" integer NOT NULL,  -- Changed to QuizID
  CONSTRAINT "QuizResult_pkey" PRIMARY KEY("ResultID"),
  CONSTRAINT "QuizResult_QuizID_fkey"
    FOREIGN KEY ("QuizID") REFERENCES "Quiz" ("QuizID")  -- Updated reference
);

CREATE TABLE "Coupon" (
  "CouponID" serial NOT NULL,
  "Message" text,
  "CouponDetails" text,
  "Expiry" date,
  "QuizID" integer NOT NULL,
  "FrontImage" bytea,  -- Column for front image
  "BackImage" bytea,   -- Column for back image
  CONSTRAINT "Coupon_pkey" PRIMARY KEY("CouponID"),
  CONSTRAINT "Coupon_QuizID_fkey"
    FOREIGN KEY ("QuizID") REFERENCES "Quiz" ("QuizID")
);


INSERT INTO "User" ("Username", "Password", "Email", "CreationDate")
VALUES ('defaultUser', 'password123', 'default@example.com', CURRENT_DATE);
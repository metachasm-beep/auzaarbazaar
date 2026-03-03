-- Critical Postgres constraints for AuzaarBazaar Message Threads & RFQs
-- Run this in the Supabase SQL Editor AFTER running your initial Prisma migrations.

-- A) Message thread uniqueness rules
-- 1) One thread per Inquiry
create unique index if not exists message_threads_unique_inquiry
on "MessageThread" ("inquiryId")
where "inquiryId" is not null;

-- 2) One thread per RFQ per Seller (preventing duplicate negotiation threads)
create unique index if not exists message_threads_unique_rfq_seller
on "MessageThread" ("rfqId", "sellerOrgId")
where "rfqId" is not null;

-- B) Thread anchor integrity (ensure thread maps correctly based on thread_type)
alter table "MessageThread"
add constraint message_thread_anchor_check
check (
  ("threadType" = 'inquiry' and "inquiryId" is not null and "rfqId" is null)
  or
  ("threadType" = 'rfq' and "rfqId" is not null and "inquiryId" is null)
  or
  ("threadType" = 'order' and "inquiryId" is null and "rfqId" is null)
);

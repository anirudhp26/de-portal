-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "aeiouStatus" "Status" NOT NULL DEFAULT 'pending',
ADD COLUMN     "empathyStatus" "Status" NOT NULL DEFAULT 'pending',
ADD COLUMN     "mindMapStatus" "Status" NOT NULL DEFAULT 'pending',
ADD COLUMN     "pdcStatus" "Status" NOT NULL DEFAULT 'pending',
ADD COLUMN     "prototypeStatus" "Status" NOT NULL DEFAULT 'pending',
ADD COLUMN     "reportStatus" "Status" NOT NULL DEFAULT 'pending';

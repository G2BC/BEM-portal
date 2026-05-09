import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  BookOpen,
  Edit2,
  ExternalLink,
  ImagePlus,
  MoreHorizontal,
  Send,
  Trash2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type SpeciesEditHeaderProps = {
  scientificName: string;
  subtitle: string;
  backPath: string;
  editPath: string;
  publicPath: string;
  photosPath: string;
  referencesPath: string;
  requestUpdatePath: string;
  isViewMode: boolean;
  isDeletingSpecies: boolean;
  canManageSpecies?: boolean;
  canManagePhotos?: boolean;
  canManageReferences?: boolean;
  canDeleteSpecies?: boolean;
  canOpenPublicPage?: boolean;
  canRequestUpdate?: boolean;
  onDelete: () => void;
};

export function SpeciesEditHeader({
  scientificName,
  subtitle,
  backPath,
  editPath,
  publicPath,
  photosPath,
  referencesPath,
  requestUpdatePath,
  isViewMode,
  isDeletingSpecies,
  canManageSpecies = true,
  canManagePhotos = true,
  canManageReferences = true,
  canDeleteSpecies = true,
  canOpenPublicPage = true,
  canRequestUpdate = false,
  onDelete,
}: SpeciesEditHeaderProps) {
  const { t } = useTranslation();
  const hasManageActions = canManageSpecies || canManagePhotos || canManageReferences;
  const hasActions = canRequestUpdate || hasManageActions || canOpenPublicPage || canDeleteSpecies;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 italic">{scientificName}</h2>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </div>
      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
        <Button variant="outline" className="w-full md:w-auto" asChild>
          <Link to={backPath}>
            <ArrowLeft className="h-4 w-4" />
            {t("panel_page.species_edit_back")}
          </Link>
        </Button>
        {hasActions ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto" disabled={isDeletingSpecies}>
                <MoreHorizontal className="h-4 w-4" />
                {t("panel_page.col_actions")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {canRequestUpdate ? (
                <DropdownMenuItem asChild>
                  <Link to={requestUpdatePath}>
                    <Send className="h-4 w-4" />
                    {t("species_page.request_update_cta")}
                  </Link>
                </DropdownMenuItem>
              ) : null}

              {canRequestUpdate && hasManageActions ? <DropdownMenuSeparator /> : null}

              {isViewMode && canManageSpecies ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to={editPath}>
                      <Edit2 className="h-4 w-4" />
                      {t("panel_page.action_manage")}
                    </Link>
                  </DropdownMenuItem>
                  {canManagePhotos ||
                  canManageReferences ||
                  canOpenPublicPage ||
                  canDeleteSpecies ? (
                    <DropdownMenuSeparator />
                  ) : null}
                </>
              ) : null}

              {canManagePhotos ? (
                <DropdownMenuItem asChild>
                  <Link to={photosPath}>
                    <ImagePlus className="h-4 w-4" />
                    {t("panel_page.action_manage_photos")}
                  </Link>
                </DropdownMenuItem>
              ) : null}

              {canManagePhotos && canManageReferences ? <DropdownMenuSeparator /> : null}

              {canManageReferences ? (
                <DropdownMenuItem asChild>
                  <Link to={referencesPath}>
                    <BookOpen className="h-4 w-4" />
                    {t("panel_page.action_manage_references")}
                  </Link>
                </DropdownMenuItem>
              ) : null}

              {(canManagePhotos || canManageReferences) && canOpenPublicPage ? (
                <DropdownMenuSeparator />
              ) : null}

              {canOpenPublicPage ? (
                <DropdownMenuItem asChild>
                  <Link to={publicPath} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    {t("panel_page.species_photos_open_public")}
                  </Link>
                </DropdownMenuItem>
              ) : null}

              {canOpenPublicPage && canDeleteSpecies ? <DropdownMenuSeparator /> : null}

              {canDeleteSpecies ? (
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => void onDelete()}
                  disabled={isDeletingSpecies}
                >
                  <Trash2 className="h-4 w-4" />
                  {t("panel_page.species_delete_action")}
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </div>
  );
}

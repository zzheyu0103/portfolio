args <- commandArgs(trailingOnly = FALSE)
script_flag <- grep("^--file=", args, value = TRUE)
script_dir <- if (length(script_flag) > 0) dirname(sub("^--file=", "", script_flag[1])) else "."
base_dir <- normalizePath(file.path(script_dir, ".."), winslash = "/", mustWork = FALSE)
data_file <- file.path(base_dir, "mock-data", "player_events.csv")
output_dir <- file.path(base_dir, "outputs")

if (!dir.exists(output_dir)) {
  dir.create(output_dir, recursive = TRUE)
}

player_events <- read.csv(data_file, stringsAsFactors = FALSE)

to_pct <- function(x) {
  round(mean(x == "yes") * 100, 1)
}

cohort_summary <- aggregate(
  cbind(retained_d1, retained_d3, retained_d7) ~ install_date,
  data = player_events,
  FUN = to_pct
)

write.csv(
  cohort_summary,
  file.path(output_dir, "r_cohort_summary.csv"),
  row.names = FALSE,
  fileEncoding = "UTF-8"
)

cat("Generated R cohort summary at:", file.path(output_dir, "r_cohort_summary.csv"), "\n")

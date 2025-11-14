{...}: {
  # Used to find the project root
  projectRootFile = "flake.nix";
  programs = {
    alejandra.enable = true;
    terraform.enable = true;
    mdformat.enable = true;
  };
}

{
  description = "Your project description";

  inputs = {
    dotfiles = {
      url = "github:chenow/dotfiles";
    };
  };

  outputs = {dotfiles, ...}: let
    treeFmtConfig = import ./treefmt.nix;
  in {
    formatter = dotfiles.lib.eachSystem (
      system: dotfiles.lib.makeFormatter system treeFmtConfig
    );
  };
}

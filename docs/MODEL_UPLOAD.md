# Model asset handoff

`model_base.glb` is the canonical model asset. Its expected SHA-256 is recorded in `avatar/model/ASSET_MANIFEST.json`.

Do not replace the model with a placeholder and do not mark the binary as uploaded until GitHub LFS/object storage contains the exact bytes matching the checksum.

Recommended upload:

```bash
git lfs install
git lfs track "avatar/model/*.glb"
git add .gitattributes avatar/model/model_base.glb
git commit -m "Add canonical Svetlana model"
git push
```

After upload, verify the SHA-256 locally and against the release artifact.
